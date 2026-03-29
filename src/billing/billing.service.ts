import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BillingService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  // --- Billing Templates ---

  async createTemplate(data: any) {
    try {
      // @ts-ignore
      return await this.prisma.billingTemplate.create({
        data: {
          ...data,
          metadata: data.metadata || {},
        },
      });
    } catch (error: any) {
      throw new BadRequestException(`Template Creation Failed: ${error.message}`);
    }
  }

  async findAllTemplates() {
    return await this.prisma.billingTemplate.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findTemplate(id: string) {
    return await this.prisma.billingTemplate.findUnique({ where: { id } });
  }

  async updateTemplate(id: string, data: Prisma.BillingTemplateUpdateInput) {
    return await this.prisma.billingTemplate.update({
      where: { id },
      data,
    });
  }

  async deleteTemplate(id: string) {
    return await this.prisma.billingTemplate.delete({ where: { id } });
  }

  async generateInvoice(data: {
    studentId: string;
    templateId?: string;
    customItems?: any[];
    amount?: number;
    tax?: number;
    total?: number;
    paymentMethod?: string;
    transactionId?: string;
    metadata?: any;
    status?: 'PENDING' | 'PAID' | 'CANCELLED';
  }) {
    const student = await this.prisma.user.findUnique({
      where: { id: data.studentId },
    });

    if (!student) throw new Error('Student not found');

    const invoiceData: any = {
      studentId: data.studentId,
      amount: data.amount ?? 0,
      tax: data.tax ?? 0,
      total: data.total ?? 0,
      items: (data.customItems as Prisma.InputJsonValue) ?? [],
      status: data.status || 'PENDING',
      paymentMethod: data.paymentMethod || null,
      transactionId: data.transactionId || null,
      metadata: (data.metadata as Prisma.InputJsonValue) || {},
      invoiceNumber: '', // Placeholder
    };

    if (data.templateId) {
      const template = await this.findTemplate(data.templateId);
      if (template) {
        invoiceData.templateId = template.id;
        if (!data.amount) {
          invoiceData.amount = template.baseAmount;
          invoiceData.tax = template.baseAmount * (template.taxRate / 100);
          invoiceData.total = invoiceData.amount + invoiceData.tax;
        }
        if (!data.customItems) {
          invoiceData.items = (template.items as Prisma.InputJsonValue) ?? [
            { description: template.name, amount: template.baseAmount },
          ];
        }
      }
    }

    // Generate unique invoice number
    const date = new Date();
    const prefix = `INV-${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;
    const count = await this.prisma.invoice.count({
      where: { invoiceNumber: { startsWith: prefix } },
    });
    invoiceData.invoiceNumber = `${prefix}-${(count + 1)
      .toString()
      .padStart(4, '0')}`;

    const invoice = await this.prisma.invoice.create({
      data: invoiceData,
      include: {
        student: {
          select: { id: true, name: true, email: true, enrollmentId: true },
        },
        template: true,
      },
    });

    // Notify student about new invoice
    try {
      await this.notificationsService.create(
        invoice.studentId,
        'New Invoice Generated',
        `A new invoice ${invoice.invoiceNumber} for ₹${invoice.total} has been generated. Please review and process your payment.`,
        'INFO',
      );
    } catch (error) {
      console.error('Failed to notify student about invoice:', error);
    }

    return invoice;
  }

  async findAllInvoices(studentId?: string) {
    return await this.prisma.invoice.findMany({
      where: studentId ? { studentId } : undefined,
      include: {
        student: {
          select: { id: true, name: true, email: true, enrollmentId: true },
        },
        template: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findInvoice(id: string) {
    return await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        student: {
          select: { id: true, name: true, email: true, enrollmentId: true },
        },
        template: true,
      },
    });
  }

  async updateInvoiceStatus(
    id: string,
    status: 'PENDING' | 'PAID' | 'CANCELLED',
  ) {
    const invoice = await this.prisma.invoice.update({
      where: { id },
      data: { status },
      include: { student: { select: { name: true } } },
    });

    // Notify student about status update
    try {
      await this.notificationsService.create(
        invoice.studentId,
        'Invoice Status Updated',
        `The status of your invoice ${invoice.invoiceNumber} has been updated to ${status}.`,
        status === 'PAID' ? 'INFO' : 'WARNING',
      );
    } catch (error) {
      console.error('Failed to notify student about invoice status update:', error);
    }

    return invoice;
  }

  async updateInvoice(id: string, data: any) {
    // Extract fields we want to update
    const { items, metadata, status, paymentMethod, transactionId, amount, tax, total } = data;
    
    // Create an update object, only including fields that are present in the request
    const updateData: any = {};
    if (items !== undefined) updateData.items = items as Prisma.InputJsonValue;
    if (metadata !== undefined) updateData.metadata = metadata as Prisma.InputJsonValue;
    if (status !== undefined) updateData.status = status;
    if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
    if (transactionId !== undefined) updateData.transactionId = transactionId;
    if (amount !== undefined) updateData.amount = parseFloat(amount.toString()) || 0;
    if (tax !== undefined) updateData.tax = parseFloat(tax.toString()) || 0;
    if (total !== undefined) updateData.total = parseFloat(total.toString()) || 0;

    // Find the current invoice to identify the linked payment before updating
    const currentInvoice = await this.prisma.invoice.findUnique({ where: { id } });

    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: updateData,
      include: {
        student: {
          select: { id: true, name: true, email: true, enrollmentId: true },
        },
        template: true,
      },
    });

    // Sync with Payment record if linked via transactionId
    const txId = updatedInvoice.transactionId || currentInvoice?.transactionId;
    if (txId) {
      try {
        const payment = await this.prisma.payment.findUnique({ 
          where: { txRef: txId } 
        });

        if (payment) {
          const paymentStatusMap: Record<string, 'PENDING' | 'SUCCESS' | 'FAILED'> = {
            'PAID': 'SUCCESS',
            'EMI': 'SUCCESS',
            'PARTIAL': 'SUCCESS',
            'PENDING': 'PENDING',
            'CANCELLED': 'FAILED'
          };

          await this.prisma.payment.update({
            where: { txRef: txId },
            data: {
              amount: updateData.total !== undefined ? updateData.total : undefined,
              status: updateData.status ? paymentStatusMap[updateData.status] : undefined,
              mode: updateData.paymentMethod !== undefined ? updateData.paymentMethod : undefined,
            }
          });
        }
      } catch (error) {
        console.error("Failed to sync invoice update with payment record:", error);
        // We don't throw here to avoid failing the whole request if only the optional sync fails
      }
    }

    return updatedInvoice;
  }

  async markInvoiceSent(id: string) {
    return await this.prisma.invoice.update({
      where: { id },
      data: { sentAt: new Date() },
    });
  }

  async deleteInvoice(id: string) {
    return await this.prisma.invoice.delete({ where: { id } });
  }

  async bulkDeleteRecords(studentIds: string[]) {
    // 1. Delete all invoices for these students
    const deletedInvoices = await this.prisma.invoice.deleteMany({
      where: { studentId: { in: studentIds } },
    });

    // 2. Delete all payments for these students
    const deletedPayments = await this.prisma.payment.deleteMany({
      where: { studentId: { in: studentIds } },
    });

    // 3. Reset financial status for these students back to "NONE"
    await this.prisma.user.updateMany({
      where: { id: { in: studentIds } },
      data: { financialStatus: "NONE" },
    });

    return {
      deletedInvoices: deletedInvoices.count,
      deletedPayments: deletedPayments.count,
    };
  }

  async getSummary() {
    const totalInvoices = await this.prisma.invoice.count();

    const outstandingResult = await this.prisma.invoice.aggregate({
      where: { status: 'PENDING' },
      _sum: { total: true },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const clearedTodayResult = await this.prisma.invoice.aggregate({
      where: {
        status: 'PAID',
        updatedAt: { gte: today },
      },
      _sum: { total: true },
    });

    return {
      totalInvoices,
      outstandingAmount: outstandingResult._sum.total || 0,
      clearedTodayAmount: clearedTodayResult._sum.total || 0,
    };
  }
}
