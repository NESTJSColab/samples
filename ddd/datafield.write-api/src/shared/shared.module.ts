import { Module } from '@nestjs/common';

import { UrlPathBuilder } from './builders';
import { PinoLoggerHelper, ThrottlerHelper } from './helpers';

@Module({
  imports: [UrlPathBuilder, PinoLoggerHelper, ThrottlerHelper],
  providers: [UrlPathBuilder, PinoLoggerHelper, ThrottlerHelper],
  exports: [],
})
export class SharedModule {}
