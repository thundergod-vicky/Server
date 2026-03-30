import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from './encryption.service';
import { Role } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('webinar-accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class WebinarAccountsController {
  constructor(
    private prisma: PrismaService,
    private encryption: EncryptionService,
  ) {}

  @Post()
  async create(@Body() data: { name: string; apiKey: string }) {
    const encryptedKey = this.encryption.encrypt(data.apiKey);
    return this.prisma.webinarGGAccount.create({
      data: {
        name: data.name,
        apiKey: encryptedKey,
      },
    });
  }

  @Get()
  async findAll() {
    const accounts = await this.prisma.webinarGGAccount.findMany({
      orderBy: { createdAt: 'desc' },
    });
    // Mask the API keys for security
    return accounts.map((a) => ({
      ...a,
      apiKey: '•••••',
    }));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { name?: string; apiKey?: string; isActive?: boolean },
  ) {
    const updateData: any = { ...data };
    if (data.apiKey) {
      updateData.apiKey = this.encryption.encrypt(data.apiKey);
    }
    return this.prisma.webinarGGAccount.update({
      where: { id },
      data: updateData,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.webinarGGAccount.delete({
      where: { id },
    });
  }
}
