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
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
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

  @Get('student/:studentId')
  getAdmissionByStudent(@Param('studentId') studentId: string) {
    return this.admissionsService.getAdmissionByStudentId(studentId);
  }

  @Get('photo/:id')
  async getPhoto(@Param('id') id: string, @Res() res: Response) {
    try {
      const { stream, contentType } =
        await this.admissionsService.getPhotoStream(id);
      res.set({
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      });
      stream.pipe(res);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Photo not found';
      res.status(404).send(message);
    }
  }

  @Patch(':id/approve')
  approveAdmission(@Param('id') id: string, @Req() req) {
    return this.admissionsService.approveAdmission(
      id,
      req.user.id || req.user.userId,
    );
  }

  @Patch(':id/reject')
  rejectAdmission(@Param('id') id: string) {
    return this.admissionsService.rejectAdmission(id);
  }
}
