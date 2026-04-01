/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = (await this.usersService.findOne(email)) as any;
    if (user && (await bcrypt.compare(pass, user.password as string))) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const u = user as {
      id: string;
      email: string;
      name: string;
      role: any;
      profileSlug?: string;
      profileSettings?: any;
      profileImage?: string;
      parentOf?: any[];
      parentRequests?: any[];
      enrollmentId?: string;
      phone?: string;
      admission?: any;
    };

    const payload = {
      email: u.email,
      sub: u.id,
      role: u.role,
    };

    // Create login history
    await this.prisma.loginHistory.create({
      data: {
        userId: u.id,
      },
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        profileSlug: u.profileSlug,
        profileSettings: u.profileSettings,
        profileImage: u.profileImage,
        enrollmentId: u.enrollmentId,
        phone: u.phone,
        parentOf: u.parentOf,
        parentRequests: u.parentRequests,
        admission: u.admission,
      },
    };
  }

  async logout(userId: string) {
    const lastLogin = await this.prisma.loginHistory.findFirst({
      where: { userId, logoutTime: null },
      orderBy: { loginTime: 'desc' },
    });

    if (lastLogin) {
      await this.prisma.loginHistory.update({
        where: { id: lastLogin.id },
        data: { logoutTime: new Date() },
      });
    }
    return { message: 'Logged out successfully' };
  }

  async register(registerDto: any) {
    const dto = registerDto as {
      password?: string;
      email?: string;
      name?: string;
      role?: string;
    };
    const hashedPassword = await bcrypt.hash(
      (dto.password as string) || '',
      10,
    );
    const user = (await this.usersService.create({
      ...(dto as any),
      password: hashedPassword,
    })) as any;

    // Notify Admins and Academic Operations about new registration
    try {
      await this.notificationsService.notifyRoles(
        ['ADMIN', 'ACADEMIC_OPERATIONS'],
        'New User Registered',
        `A new ${(dto.role || 'user').toLowerCase()} named ${dto.name || 'Unknown'} joined.`,
        'INFO',
        `/dashboard?view=users`,
      );

      // Welcome the user themselves
      await this.notificationsService.create(
        (user as { id: string }).id,
        'Welcome to Adhyayan!',
        `Hi ${(user as { name: string }).name || 'User'}, your account is active. Welcome!`,
        'INFO',
        `/dashboard?view=courses`,
      );
    } catch (error) {
      console.error('Failed to notify staff about registration:', error);
    }

    return this.login(user);
  }
}
