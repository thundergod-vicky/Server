import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { ContentController } from './content.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContentController],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class ContentModule {}
