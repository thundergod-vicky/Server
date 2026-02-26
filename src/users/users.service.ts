import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async findOne(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        assignedByTeacher: { select: { name: true } },
        parentOf: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                grade: true,
                medal: true,
                profileSlug: true,
              },
            },
          },
        },
        studentOf: {
          include: {
            parent: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        parentRequests: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (user && (!user.profileSlug || !user.profileSettings)) {
      const updateData: any = {};
      if (!user.profileSlug) updateData.profileSlug = crypto.randomUUID();
      if (!user.profileSettings) {
        updateData.profileSettings = {
          showMedals: true,
          showGrades: true,
          showCourses: true,
          showTestResults: true,
        };
      }
      return this.prisma.user.update({
        where: { id: user.id },
        data: updateData,
        include: {
          assignedByTeacher: { select: { name: true } },
          parentOf: {
            include: {
              student: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  grade: true,
                  medal: true,
                  profileSlug: true,
                },
              },
            },
          },
          studentOf: {
            include: {
              parent: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
          parentRequests: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    }
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        assignedByTeacher: { select: { name: true } },
        parentOf: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                grade: true,
                medal: true,
                profileSlug: true,
              },
            },
          },
        },
        parentRequests: {
          orderBy: { createdAt: 'desc' },
        },
        studentOf: {
          include: {
            parent: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        enrollments: {
          include: {
            course: {
              select: { id: true, title: true, thumbnail: true },
            },
          },
        },
        practiceTestResults: {
          include: {
            test: { select: { id: true, title: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (user && !user.profileSlug) {
      return this.prisma.user.update({
        where: { id: user.id },
        data: { profileSlug: crypto.randomUUID() },
        include: {
          assignedByTeacher: { select: { name: true } },
          parentOf: {
            include: {
              student: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  grade: true,
                  medal: true,
                  profileSlug: true,
                },
              },
            },
          },
          studentOf: {
            include: {
              parent: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
          parentRequests: {
            orderBy: { createdAt: 'desc' },
          },
          enrollments: {
            include: {
              course: {
                select: { id: true, title: true, thumbnail: true },
              },
            },
          },
          practiceTestResults: {
            include: {
              test: { select: { id: true, title: true } },
            },
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    }
    return user;
  }

  async findAllStudents() {
    return await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        medal: true,
        grade: true,
        academicAssignedAt: true,
        assignedByTeacher: { select: { name: true } },
        _count: {
          select: {
            enrollments: true,
            practiceTestResults: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateAcademicStatus(
    studentId: string,
    teacherId: string,
    data: { medal?: any; grade?: any },
  ) {
    return await this.prisma.user.update({
      where: { id: studentId },
      data: {
        medal: data.medal,
        grade: data.grade,
        assignedByTeacher: { connect: { id: teacherId } },
        academicAssignedAt: new Date(),
      },
    });
  }

  private getRandomAvatar(): string {
    const styles = ['fun-emoji', 'bottts', 'pixel-art', 'adventurer', 'notionists'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = crypto.randomBytes(8).toString('hex');
    return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const profileImage = data.profileImage || this.getRandomAvatar();
    return this.prisma.user.create({
      data: {
        ...data,
        profileImage,
      },
    });
  }

  async resetProfileImage(id: string): Promise<User | null> {
    const randomAvatar = this.getRandomAvatar();
    return this.prisma.user.update({
      where: { id },
      data: { profileImage: randomAvatar },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        assignedByTeacher: { select: { name: true } },
        parentOf: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                grade: true,
                medal: true,
                profileSlug: true,
              },
            },
          },
        },
        parentRequests: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  // Parent Portal Methods

  async createParentRequest(parentId: string, studentEmail: string) {
    // Check if already linked
    const student = await this.prisma.user.findUnique({ where: { email: studentEmail } });
    if (student) {
      const existingLink = await this.prisma.parentStudent.findUnique({
        where: { parentId_studentId: { parentId, studentId: student.id } }
      });
      if (existingLink) throw new Error('Student is already linked to your account');
    }

    // Check for pending request
    const existingRequest = await this.prisma.parentRequest.findFirst({
      where: {
        parentId,
        studentEmail,
        status: 'PENDING',
      },
    });

    if (existingRequest) {
      throw new Error('A pending request already exists for this student');
    }

    return this.prisma.parentRequest.create({
      data: {
        parentId,
        studentEmail,
        status: 'PENDING',
      },
    });
  }

  async getPendingRequests() {
    return this.prisma.parentRequest.findMany({
      where: { status: 'PENDING' },
      include: { parent: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approveRequest(requestId: string) {
    const request = await this.prisma.parentRequest.findUnique({
      where: { id: requestId },
      include: { parent: true },
    });

    if (!request) throw new Error('Request not found');

    // Find student by email
    const student = await this.prisma.user.findUnique({
      where: { email: request.studentEmail },
    });

    if (!student) throw new Error('Student not found');

    // Create link
    await this.prisma.parentStudent.create({
      data: {
        parentId: request.parentId,
        studentId: student.id,
      },
    });

    // Update request
    await this.prisma.parentRequest.update({
      where: { id: requestId },
      data: { status: 'APPROVED' },
    });

    // Notify Student
    await this.notificationsService.create(
      student.id,
      'Parent Linked',
      `${request.parent.name} has been linked as your parent. If this is incorrect, please report to admin.`,
      'ALERT',
    );

    return { success: true };
  }

  async rejectRequest(requestId: string) {
    return this.prisma.parentRequest.update({
      where: { id: requestId },
      data: { status: 'REJECTED' },
    });
  }

  async manualLinkParentStudent(parentId: string, studentEmail: string) {
    const student = await this.prisma.user.findUnique({
      where: { email: studentEmail },
    });
    const parent = await this.prisma.user.findUnique({
      where: { id: parentId },
    });

    if (!student || !parent) throw new Error('User not found');

    // Create link
    await this.prisma.parentStudent.create({
      data: { parentId, studentId: student.id },
    });

    // Notify Student
    await this.notificationsService.create(
      student.id,
      'Parent Linked',
      `${parent.name} has been linked as your parent by Admin. If this is incorrect, please report.`,
      'ALERT',
    );
    // Notify Parent
    await this.notificationsService.create(
      parent.id,
      'Student Linked',
      `You have been linked to student ${student.name} by Admin.`,
      'INFO',
    );

    return { success: true };
  }

  async getStudentData(parentId: string, studentId: string) {
    // Verify parent-student link
    const link = await this.prisma.parentStudent.findUnique({
      where: { parentId_studentId: { parentId, studentId } },
    });

    if (!link) {
      throw new Error('Not authorized to view this student data');
    }

    return this.prisma.user.findUnique({
      where: { id: studentId },
      include: {
        enrollments: { include: { course: true } },
        assignedCourses: { include: { course: true } },
        practiceTestResults: {
          include: { test: true },
          take: 20,
          orderBy: { createdAt: 'desc' },
        },
        loginHistory: {
          take: 10,
          orderBy: { loginTime: 'desc' },
        },
        assignedByTeacher: { select: { name: true, email: true } },
      },
    });
  }

  async findAllTeachers() {
    return this.prisma.user.findMany({
      where: { role: 'TEACHER' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async findAllParents() {
    return this.prisma.user.findMany({
      where: { role: 'PARENT' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        parentOf: {
          include: {
            student: {
              select: { name: true }
            }
          }
        }
      },
    });
  }
}
