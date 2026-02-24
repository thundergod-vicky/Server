import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const result = { ...user };
      delete (result as any).password;
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
      parentOf?: any[];
      parentRequests?: any[];
    };
    
    const payload = { 
      email: u.email, 
      sub: u.id, 
      role: u.role 
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
        parentOf: u.parentOf,
        parentRequests: u.parentRequests,
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
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.login(user);
  }
}
