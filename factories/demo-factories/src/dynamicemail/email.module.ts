import {
  ConfigurableModuleAsyncOptions,
  DynamicModule,
  Module,
} from '@nestjs/common';

import EmailService from './dynamicemail.service';
import { ConfigurableEmailModule } from './module-definition';
import { EmailOptions } from './options';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule extends ConfigurableEmailModule {
  static register(options: EmailOptions): DynamicModule {
    return {
      ...super.register(options),
    };
  }

  static registerAsync(
    options: ConfigurableModuleAsyncOptions<EmailOptions>,
  ): DynamicModule {
    return {
      // you can put additional configuration here
      ...super.registerAsync(options),
    };
  }
}
