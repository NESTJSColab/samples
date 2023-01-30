import { DynamicModule, Module } from '@nestjs/common';
import { EMAIL_CONFIG_OPTIONS } from './constants';
import EmailService from './dynamicemail.service';
import { EmailAsyncOptions, EmailOptions } from './options';

@Module({})
export class DynamicEmailModule {
  static forRoot(options: EmailOptions): DynamicModule {
    return {
      module: DynamicEmailModule,
      providers: [
        {
          provide: EMAIL_CONFIG_OPTIONS,
          useValue: options,
        },
        EmailService,
      ],
      exports: [EmailService],
    };
  }
  static forRootAsync(options: EmailAsyncOptions): DynamicModule {
    return {
      module: DynamicEmailModule,
      imports: options.imports,
      providers: [
        {
          provide: EMAIL_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        EmailService,
      ],
      exports: [EmailService],
    };
  }
}
