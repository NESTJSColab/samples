import { Module } from '@nestjs/common';
import { HttpConfigService } from './http-config.service';

@Module({
  providers: [HttpConfigService],
  exports: [HttpConfigService],
})
export class HttpConfigModule {}
