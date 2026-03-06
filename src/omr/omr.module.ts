import { Module } from '@nestjs/common';
import { OmrService } from './omr.service';
import { OmrController } from './omr.controller';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../content/s3.service';

@Module({
  controllers: [OmrController],
  providers: [OmrService, PrismaService, S3Service],
})
export class OmrModule {}
