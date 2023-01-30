import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseValueFactoryModule } from './usevalue/usevalue.module';
import { UseFactoryModule } from './usefactory/usefactory.module';
import { CryptoManagerModule } from './cryptomanager/cryptomanager.module';
import { DynamicEmailModule } from './dynamicemail/dynamicemail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UseValueFactoryModule.forRoot({ type: 'A' }),
    UseFactoryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('type') ?? 'B',
      }),
      inject: [ConfigService],
    }),
    CryptoManagerModule.forRoot({ global: true }),
    // DynamicEmailModule.forRoot({
    //   service: 'gmail',
    //   user: 'beyondnet.peru@gmail.com',
    //   password: 'xxxxx',
    // }),
    /*
    imports – a list of modules we want the EmailModule to import because we need them in useFactory,
    inject – a list of providers we want NestJS to inject into the context of the useFactory function,
    useFactory – a function that returns the value for our EMAIL_CONFIG_OPTIONS provider.
    */
    DynamicEmailModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        service: configService.get('EMAIL_SERVICE'),
        user: configService.get('EMAIL_USER'),
        password: configService.get('EMAIL_PASSWORD'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
