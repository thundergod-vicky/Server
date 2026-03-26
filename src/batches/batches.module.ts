import { Module } from '@nestjs/common';
import { BatchesService } from './batches.service';
import { BatchesController } from './batches.controller';
import { SubjectsController } from './subjects.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SubjectsService } from './subjects.service';

@Module({
  imports: [PrismaModule],
  controllers: [BatchesController, SubjectsController],
  providers: [BatchesService, SubjectsService],
  exports: [BatchesService, SubjectsService],
})
export class BatchesModule {}
