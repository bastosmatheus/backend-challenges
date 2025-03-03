import { Module } from '@nestjs/common';
import { CdbService } from './cdb.service';
import { CdbController } from './cdb.controller';

@Module({
  controllers: [CdbController],
  providers: [CdbService],
})
export class CdbModule {}
