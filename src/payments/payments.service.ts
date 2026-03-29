/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
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

    const payment = await this.prisma.payment.create({
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

    // Notify Student about payment record
    try {
      await this.notificationsService.create(
        payment.studentId,
        'Payment Recorded',
        `A payment of ₹${payment.amount} has been recorded (Status: ${payment.status}). Mode: ${payment.mode || 'N/A'}.`,
        payment.status === 'SUCCESS' ? 'INFO' : 'WARNING',
      );
    } catch (error) {
      console.error('Failed to notify student about payment:', error);
    }

    // Notify Admins/Accounts if it's a new successful payment
    if (payment.status === 'SUCCESS') {
      try {
        const staffUsers = await this.prisma.user.findMany({
          where: {
            role: { in: ['ADMIN', 'ACCOUNTS'] },
          },
        });

        for (const staff of staffUsers) {
          await this.notificationsService.create(
            staff.id,
            'New Payment Received',
            `A successful payment of ₹${payment.amount} has been received from ${payment.student.name} (${payment.student.enrollmentId || 'Manual Entry'}).`,
            'INFO',
          );
        }
      } catch (error) {
        console.error('Failed to notify staff about payment:', error);
      }
    }

    return payment;
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
    const payment = await this.prisma.payment.update({
      where: { id },
      data: { status },
      include: { student: { select: { name: true } } },
    });

    // Notify student about status change
    try {
      await this.notificationsService.create(
        payment.studentId,
        'Payment Status Updated',
        `Your payment of ₹${payment.amount} status has been updated to ${status}.`,
        status === 'SUCCESS' ? 'INFO' : 'WARNING',
      );
    } catch (error) {
      console.error('Failed to notify student about payment update:', error);
    }

    return payment;
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

    return (students as any[]).map((s) => {
      const totalPaidFromPayments = s.payments
        .filter((p: any) => p.status === 'SUCCESS')
        .reduce((sum: number, p: any) => sum + p.amount, 0);

      const totalPaidFromInvoices = s.invoices
        .filter((inv: any) => inv.status === 'PAID')
        .reduce((sum: number, inv: any) => sum + (inv.total || inv.amount), 0);

      const totalPaid = Math.max(totalPaidFromPayments, totalPaidFromInvoices);

      const totalFee = s.invoices
        .filter((inv: any) => inv.status !== 'CANCELLED')
        .reduce((sum: number, inv: any) => sum + (inv.total || inv.amount), 0);
        
      const due = Math.max(0, totalFee - totalPaid);

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
