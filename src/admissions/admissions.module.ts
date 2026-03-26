import { Module } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { AdmissionsController } from './admissions.controller';
import { ContentModule } from '../content/content.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ContentModule, PrismaModule],
  providers: [AdmissionsService],
  controllers: [AdmissionsController],
  exports: [AdmissionsService],
})
export class AdmissionsModule {}
