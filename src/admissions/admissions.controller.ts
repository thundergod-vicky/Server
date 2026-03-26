import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdmissionsService } from './admissions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admissions')
@UseGuards(JwtAuthGuard)
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Get('next-numbers')
  getNextNumbers() {
    return this.admissionsService.getNextNumbers();
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  submitAdmission(
    @Req() req,
    @Body() data: any,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.admissionsService.submitAdmission(
      req.user.id || req.user.userId,
      data,
      photo,
    );
  }

  @Get('me')
  getMyAdmission(@Req() req) {
    return this.admissionsService.getMyAdmission(
      req.user.id || req.user.userId,
    );
  }

  @Get()
  getAllAdmissions() {
    return this.admissionsService.getAllAdmissions();
  }

  @Patch(':id/approve')
  approveAdmission(@Param('id') id: string, @Req() req) {
    return this.admissionsService.approveAdmission(
      id,
      req.user.id || req.user.userId,
    );
  }
}
