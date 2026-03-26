import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../content/s3.service';
import { AdmissionStatus, Stream, Caste } from '@prisma/client';

@Injectable()
export class AdmissionsService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async getNextNumbers() {
    const count = await this.prisma.admission.count();
    const nextId = count + 1;
    const formNumber = `ADH-${String(nextId).padStart(2, '0')}`;
    const enrollmentNumber = String(nextId).padStart(3, '0');

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

    return this.prisma.admission.create({
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
        caste: data.caste as Caste,
        photoUrl: photoUrl,
        formNumber: formNumber,
        enrollmentNumber: data.enrollmentNumber || enrollmentNumber,
        status: 'PENDING',
        admissionDate: new Date(),
      },
    });
  }

    async getMyAdmission(userId: string) {
        return this.prisma.admission.findUnique({
            where: { studentId: userId }
        });
    }

    async getAllAdmissions() {
        return this.prisma.admission.findMany({
            include: { student: true }
        });
    }

    async approveAdmission(id: string, approvedBy: string) {
        return this.prisma.admission.update({
            where: { id },
            data: {
                status: 'APPROVED',
                approvedById: approvedBy,
                approvedAt: new Date()
            }
        });
    }
}
