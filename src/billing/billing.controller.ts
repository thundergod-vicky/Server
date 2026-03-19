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
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('billing')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('summary')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  getSummary() {
    return this.billingService.getSummary();
  }

  // --- Billing Templates ---

  @Post('templates')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  createTemplate(@Body() body: any) {
    return this.billingService.createTemplate(body);
  }

  @Get('templates')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  findAllTemplates() {
    return this.billingService.findAllTemplates();
  }

  @Get('templates/:id')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  findTemplate(@Param('id') id: string) {
    return this.billingService.findTemplate(id);
  }

  @Patch('templates/:id')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  updateTemplate(@Param('id') id: string, @Body() body: any) {
    return this.billingService.updateTemplate(id, body);
  }

  @Delete('templates/:id')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  deleteTemplate(@Param('id') id: string) {
    return this.billingService.deleteTemplate(id);
  }

  // --- Invoices ---

  @Post('invoices')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  generateInvoice(@Body() body: any) {
    return this.billingService.generateInvoice(body);
  }

  @Get('invoices')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  findAllInvoices(@Query('studentId') studentId?: string) {
    return this.billingService.findAllInvoices(studentId);
  }

  @Get('invoices/:id')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  findInvoice(@Param('id') id: string) {
    return this.billingService.findInvoice(id);
  }

  @Patch('invoices/:id/status')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  updateInvoiceStatus(
    @Param('id') id: string,
    @Body('status') status: 'PENDING' | 'PAID' | 'CANCELLED',
  ) {
    return this.billingService.updateInvoiceStatus(id, status);
  }

  @Patch('invoices/:id')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  updateInvoice(@Param('id') id: string, @Body() body: any) {
    return this.billingService.updateInvoice(id, body);
  }

  @Post('invoices/:id/send')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  markInvoiceSent(@Param('id') id: string) {
    return this.billingService.markInvoiceSent(id);
  }

  @Delete('invoices/:id')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  deleteInvoice(@Param('id') id: string) {
    return this.billingService.deleteInvoice(id);
  }

  @Post('invoices/bulk-delete')
  @Roles(Role.ADMIN, Role.ACCOUNTS)
  bulkDelete(@Body('studentIds') studentIds: string[]) {
    return this.billingService.bulkDeleteRecords(studentIds);
  }
}
