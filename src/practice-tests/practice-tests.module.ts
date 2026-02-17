import { Module } from '@nestjs/common';
import { PracticeTestsController } from './practice-tests.controller';
import { PracticeTestsService } from './practice-tests.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PracticeTestsController],
  providers: [PracticeTestsService],
  exports: [PracticeTestsService],
})
export class PracticeTestsModule {}
