/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../content/s3.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AdmissionStatus, Stream, Caste } from '@prisma/client';

@Injectable()
export class AdmissionsService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
    private notificationsService: NotificationsService,
  ) {}

  async getNextNumbers() {
    const lastAdmission = await this.prisma.admission.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { formNumber: true, enrollmentNumber: true }
    });

    let nextId = 1;
    if (lastAdmission?.formNumber) {
      const match = lastAdmission.formNumber.match(/ADH-(\d+)/);
      if (match) {
        nextId = parseInt(match[1]) + 1;
      }
    }

    const formNumber = `ADH-${String(nextId).padStart(4, '0')}`;
    const enrollmentNumber = String(nextId).padStart(6, '0');

    return { formNumber, enrollmentNumber };
  }

  async submitAdmission(
    userId: string,
    data: any,
    photo?: Express.Multer.File,
  ) {
    let photoUrl: string | null = null;
    if (photo) {
      const uploadResult = await this.s3Service.uploadFile(photo);
      photoUrl = uploadResult.webViewLink;
    }

    const { formNumber, enrollmentNumber } = await this.getNextNumbers();

    const admission = await this.prisma.admission.create({
      data: {
        studentId: userId,
        studentName: data.studentName,
        fatherName: data.fatherName,
        motherName: data.motherName,
        email: data.email,
        address: data.address,
        dateOfBirth: new Date(data.dateOfBirth),
        contactNumber: data.contactNumber,
        alternateContact: data.alternateContact,
        studentClass: data.studentClass,
        stream: (data.stream as string).toUpperCase() as Stream,
        course: data.course,
        batchCode: data.batchCode,
        schoolName: data.schoolName,
        board: data.board,
        caste: (data.caste as string)?.toUpperCase() as Caste,
        photoUrl: photoUrl,
        formNumber: formNumber,
        enrollmentNumber: data.enrollmentNumber || enrollmentNumber,
        status: 'PENDING',
        admissionDate: new Date(),
      },
    });

    try {
      await this.notificationsService.notifyRoles(
        ['ADMIN', 'ACADEMIC_OPERATIONS'],
        'New Admission Submission',
        `${data.studentName} (${data.email}) has submitted an admission form. Form ID: ${formNumber}`,
        'INFO',
        `/dashboard?view=users&studentId=${admission.studentId}`,
      );
    } catch (error) {
      console.error('Failed to notify staff about admission:', error);
    }

    return admission;
  }

  async getMyAdmission(userId: string) {
    return this.prisma.admission.findUnique({
      where: { studentId: userId },
    });
  }

  async getAllAdmissions() {
    const admissions = await this.prisma.admission.findMany({
      include: { student: true },
    });

    return Promise.all(
      admissions.map(async (admission) => {
        if (admission.photoUrl) {
          try {
            const urlParts = admission.photoUrl.split('.amazonaws.com/');
            const key = urlParts.length > 1 ? urlParts[1] : admission.photoUrl;
            const { signedUrl } = await this.s3Service.createSignedUrl(
              key,
              3600,
            );
            return { ...admission, photoUrl: signedUrl };
          } catch (error) {
            console.error('Failed to sign photo URL in list:', error);
          }
        }
        return admission;
      }),
    );
  }

  async approveAdmission(id: string, approvedBy: string) {
    const admission = await this.prisma.admission.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedById: approvedBy,
        approvedAt: new Date(),
      },
      include: { student: { select: { id: true, name: true } } },
    });

    // Notify student and parents about approval
    try {
      await this.notificationsService.notifyStudentAndParents(
        admission.studentId,
        'Admission Approved',
        `Welcome to Adhyayan, ${admission.student.name}! Your admission has been approved. You can now access all student features.`,
        'INFO',
      );
    } catch (error) {
      console.error('Failed to notify about admission approval:', error);
    }

    return admission;
  }

  async rejectAdmission(id: string) {
    const admission = await this.prisma.admission.update({
      where: { id },
      data: { status: 'REJECTED' },
      include: { student: { select: { id: true } } },
    });

    // Notify student and parents about rejection
    try {
      await this.notificationsService.notifyStudentAndParents(
        admission.studentId,
        'Admission Status Update',
        'Your admission request has been rejected. Please contact the academic office for more details.',
        'ALERT',
      );
    } catch (error) {
      console.error('Failed to notify about admission rejection:', error);
    }

    return admission;
  }

  async updateAdmission(id: string, data: any) {
    if (!id || id === 'undefined') {
      throw new BadRequestException('Valid admission ID is required for update');
    }
    return this.prisma.admission.update({
      where: { id },
      data: {
        ...(data.studentName && { studentName: data.studentName }),
        ...(data.fatherName && { fatherName: data.fatherName }),
        ...(data.motherName && { motherName: data.motherName }),
        ...(data.email && { email: data.email }),
        ...(data.contactNumber && { contactNumber: data.contactNumber }),
        ...(data.alternateContact !== undefined && { alternateContact: data.alternateContact }),
        ...(data.address && { address: data.address }),
        ...(data.dateOfBirth && { dateOfBirth: new Date(data.dateOfBirth) }),
        ...(data.caste && { 
          caste: (data.caste as string).toUpperCase() as Caste,
        }),
        ...(data.studentClass && { studentClass: data.studentClass }),
        ...(data.stream && { stream: data.stream }),
        ...(data.course && { course: data.course }),
        ...(data.schoolName && { schoolName: data.schoolName }),
        ...(data.board && { board: data.board }),
        ...(data.batchCode !== undefined && { batchCode: data.batchCode }),
        ...(data.enrollmentNumber && { enrollmentNumber: data.enrollmentNumber }),
        ...(data.formNumber && { formNumber: data.formNumber }),
      },
    });
  }

  async getAdmissionByStudentId(studentId: string) {
    const admission = await this.prisma.admission.findUnique({
      where: { studentId },
      include: { student: { select: { name: true, email: true } } },
    });

    if (admission && admission.photoUrl) {
      try {
        // Extract key from full S3 URL if possible
        const urlParts = admission.photoUrl.split('.amazonaws.com/');
        const key = urlParts.length > 1 ? urlParts[1] : admission.photoUrl;

        const { signedUrl } = await this.s3Service.createSignedUrl(key, 3600); // 1 hour
        return { ...admission, photoUrl: signedUrl };
      } catch (error) {
        console.error('Failed to sign photo URL:', error);
      }
    }

    return admission;
  }

  async getPhotoStream(id: string) {
    const admission = await this.prisma.admission.findUnique({
      where: { id },
    });

    if (!admission || !admission.photoUrl) {
      throw new Error('Photo not found');
    }

    const urlParts = admission.photoUrl.split('.amazonaws.com/');
    const key = urlParts.length > 1 ? urlParts[1] : admission.photoUrl;

    const stream = await this.s3Service.getFileStream(key);
    const metadata = await this.s3Service.getFileMetadata(key);

    return { stream, contentType: metadata.mimeType };
  }
}
