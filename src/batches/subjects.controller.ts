import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SubjectsService } from './subjects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Subjects')
@ApiBearerAuth()
@Controller('batches/:batchId/subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  private checkAdmin(req: any) {
    const user = req.user as { role: string };
    if (user.role !== 'ADMIN' && user.role !== 'ACADEMIC_OPERATIONS') {
      throw new ForbiddenException(
        'Only admins or academic operations can perform this action',
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Add a subject to a batch' })
  create(
    @Param('batchId') batchId: string,
    @Body() data: { name: string },
    @Request() req,
  ) {
    this.checkAdmin(req);
    return this.subjectsService.create(batchId, data.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subjects for a batch' })
  findByBatch(@Param('batchId') batchId: string) {
    return this.subjectsService.findByBatch(batchId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a subject from a batch' })
  remove(@Param('id') id: string, @Request() req) {
    this.checkAdmin(req);
    return this.subjectsService.remove(id);
  }
}
