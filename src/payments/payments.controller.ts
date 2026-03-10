import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  findAll(@Query('studentId') studentId?: string) {
    return this.paymentsService.findAll(studentId);
  }

  @Get('summaries')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  getStudentSummaries() {
    return this.paymentsService.getStudentSummaries();
  }

  @Post()
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  create(
    @Body()
    body: {
      studentId?: string;
      manualName?: string;
      manualPhone?: string;
      manualNote?: string;
      amount: number;
      status: 'PENDING' | 'SUCCESS' | 'FAILED';
      txRef?: string;
      mode?: string;
      description?: string;
    },
  ) {
    return this.paymentsService.create(body);
  }

  @Get('student/:studentId')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  findByStudent(@Param('studentId') studentId: string) {
    return this.paymentsService.findByStudent(studentId);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'PENDING' | 'SUCCESS' | 'FAILED',
  ) {
    return this.paymentsService.update(id, status);
  }

  @Patch('student/:studentId/status')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  updateStudentStatus(
    @Param('studentId') studentId: string,
    @Body('status') status: string,
  ) {
    return this.paymentsService.updateStudentStatus(studentId, status);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
