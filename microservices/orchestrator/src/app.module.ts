import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { TagsModule } from './tags/tags.module';
import { EmitterOptions } from './common/constants';

@Module({
  imports: [
    EventEmitterModule.forRoot(EmitterOptions),
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
