import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { BiometricLogDto } from './dto/biometric-log.dto';
import { BiometricAuthGuard } from '../auth/biometric-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('biometrics')
export class AttendanceController {
  private readonly logger = new Logger(AttendanceController.name);

  constructor(private attendanceService: AttendanceService) {}

  @UseGuards(BiometricAuthGuard)
  @Post('attendence-log')
  async recordAttendance(@Body() data: any) {
    this.logger.log(
      `Received biometric attendance log: ${JSON.stringify(data)}`,
    );
    return this.attendanceService.recordBiometricAttendance(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.ACADEMIC_OPERATIONS)
  @Get('generate-key')
  async generateKey() {
    return this.attendanceService.generateBiometricKey();
  }
}
