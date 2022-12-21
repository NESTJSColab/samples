import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { HttpConfigModule, HttpConfigService } from 'src/common/http-config';
import { SharedProxyModule } from 'beyondnet.nestjssharedlib/dist/src';

@Module({
  imports: [
    SharedProxyModule,
    HttpModule.registerAsync({
      imports: [HttpConfigModule],
      useExisting: HttpConfigService,
    }),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
