import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ContentController } from './content.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContentController],
  providers: [S3Service],
  exports: [S3Service],
})
export class ContentModule {}
