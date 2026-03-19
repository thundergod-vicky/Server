import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  /** All payments with student info — for ACCOUNTS dashboard */
  async findAll(studentId?: string) {
    return this.prisma.payment.findMany({
      where: studentId ? { studentId } : undefined,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            enrollmentId: true,
            batchesEnrolled: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Create a payment record manually (by ACCOUNTS role) */
  async create(data: {
    studentId?: string;
    manualName?: string;
    manualPhone?: string;
    manualNote?: string;
    amount: number;
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    txRef?: string;
    mode?: string;
    description?: string;
  }) {
    let targetStudentId = data.studentId;

    // If no studentId provided, we create a new Student record (User)
    if (!targetStudentId && data.manualName) {
      const hashedPassword = await bcrypt.hash('adhyayan123', 10);
      const manualPhoneSerial = data.manualPhone || `MAN-${Date.now()}`;

      const newStudent = await this.usersService.create({
        name: data.manualName,
        phone: data.manualPhone,
        email: `${manualPhoneSerial}@manual.adhyayan.com`,
        password: hashedPassword,
        role: 'STUDENT',
        isManual: true,
      });
      targetStudentId = newStudent.id;
    }

    if (!targetStudentId) {
      throw new Error(
        'Cannot record payment: No student selected and no manual entry data provided.',
      );
    }

    return this.prisma.payment.create({
      data: {
        studentId: targetStudentId,
        amount: data.amount,
        status: data.status,
        mode: data.mode,
        description: data.description || data.manualNote,
        txRef: data.txRef || `MANUAL-${Date.now()}`,
      },
      include: {
        student: {
          select: { id: true, name: true, email: true, enrollmentId: true },
        },
      },
    });
  }

  /** Find all payments for a specific student */
  async findByStudent(studentId: string) {
    return this.prisma.payment.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Update payment status */
  async update(id: string, status: 'PENDING' | 'SUCCESS' | 'FAILED') {
    return this.prisma.payment.update({
      where: { id },
      data: { status },
    });
  }

  /** Delete a payment record */
  async remove(id: string) {
    return this.prisma.payment.delete({ where: { id } });
  }

  /** Summary stats per student (for StudentDetails table) */
  async getStudentSummaries() {
    const students = await this.prisma.user.findMany({
      where: {
        role: 'STUDENT',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        enrollmentId: true,
        financialStatus: true,
        batchesEnrolled: { select: { id: true, name: true } },
        payments: true,
        invoices: true,
      },
      orderBy: { name: 'asc' },
    });

    interface StudentWithPaymentsAndInvoices {
      id: string;
      name: string | null;
      email: string;
      phone: string | null;
      enrollmentId: string | null;
      financialStatus: string | null;
      batchesEnrolled: { id: string; name: string }[];
      payments: { amount: number; status: string }[];
      invoices: { total: number; amount: number; status: string }[];
    }
    return (students as unknown as StudentWithPaymentsAndInvoices[]).map((s) => {
      const totalPaidFromPayments = s.payments
        .filter((p) => p.status === 'SUCCESS')
        .reduce((sum, p) => sum + p.amount, 0);

      const totalPaidFromInvoices = s.invoices
        .filter((inv) => inv.status === 'PAID')
        .reduce((sum, inv) => sum + (inv.total || inv.amount), 0);

      // Use the higher value to ensure that paid invoices are always accounted for, 
      // even if the linked payment record has an outdated amount.
      const totalPaid = Math.max(totalPaidFromPayments, totalPaidFromInvoices);

      const totalFee = s.invoices
        .filter((inv) => inv.status !== 'CANCELLED')
        .reduce((sum, inv) => sum + (inv.total || inv.amount), 0);
        
      const due = Math.max(0, totalFee - totalPaid);

      // Use manual status if set and valid, else calculate
      let status = s.financialStatus || 'NONE';
      if (!s.financialStatus || s.financialStatus === 'NONE') {
        const hasPayments = s.payments.length > 0;
        status = !hasPayments
          ? 'NONE'
          : due <= 0
            ? 'PAID'
            : totalPaid > 0
              ? 'PARTIAL'
              : 'OVERDUE';
      }

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        phone: s.phone,
        enrollmentId: s.enrollmentId,
        batches: s.batchesEnrolled,
        totalFee,
        totalPaid,
        due,
        status,
        manualStatus: s.financialStatus,
        payments: s.payments,
      };
    });
  }

  /** Update a student's manual financial status */
  async updateStudentStatus(studentId: string, status: string) {
    return this.prisma.user.update({
      where: { id: studentId },
      data: { financialStatus: status },
    });
  }
}
