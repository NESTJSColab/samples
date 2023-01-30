import { ConfigurableModuleBuilder } from '@nestjs/common';

import { EmailOptions } from './options';

export const {
  ConfigurableModuleClass: ConfigurableEmailModule,
  MODULE_OPTIONS_TOKEN: EMAIL_CONFIG_OPTIONS,
} = new ConfigurableModuleBuilder<EmailOptions>().build();
