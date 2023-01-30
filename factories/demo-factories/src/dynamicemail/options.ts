import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export interface EmailOptions {
  service: string;
  user: string;
  password: string;
}

export type EmailAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<EmailOptions>, 'useFactory' | 'inject'>;
