import { Module } from '@nestjs/common';
import { WebinarGGService } from './webinar-gg.service';
import { EncryptionService } from './encryption.service';
import { WebinarAccountsController } from './webinar-accounts.controller';
import { WebinarsController } from './webinars.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RecordingsModule } from '../recordings/recordings.module';

@Module({
  imports: [PrismaModule, RecordingsModule],
  providers: [WebinarGGService, EncryptionService],
  controllers: [WebinarAccountsController, WebinarsController],
  exports: [WebinarGGService, EncryptionService],
})
export class WebinarGGModule {}
