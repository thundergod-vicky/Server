import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BiometricLogDto } from './dto/biometric-log.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(AttendanceService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async recordBiometricAttendance(data: BiometricLogDto) {
    const { employee_code, log_datetime, log_time, downloaded_at, device_sn } =
      data;

    try {
      // Save the attendance log
      // We attempt to link it to a user using the employee_code -> userCode mapping
      return await this.prisma.biometricAttendance.create({
        data: {
          employeeCode: employee_code,
          logDateTime: new Date(log_datetime),
          logTime: log_time,
          downloadedAt: downloaded_at ? new Date(downloaded_at) : null,
          deviceSn: device_sn,
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to record biometric attendance for ${employee_code}: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async generateBiometricKey() {
    const payload = { sub: 'biometric-system', type: 'api-key' };
    return {
      api_key: this.jwtService.sign(payload, {
        secret: process.env.BIOMETRIC_API_KEY_SECRET,
        expiresIn: '9999y', // Effectively non-expiring
      }),
    };
  }
}
