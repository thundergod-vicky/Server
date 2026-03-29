import { Module, Global } from '@nestjs/common';
import { GoogleService } from './google.service';

@Global()
@Module({
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
