import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseValueFactoryModule } from './usevalue/usevalue.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UseValueFactoryModule.forRoot({ type: 'A' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
