import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    // Create login history
    await this.prisma.loginHistory.create({
      data: {
        userId: user.id,
        // IP and device could be extracted from request context if passed
      },
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
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
