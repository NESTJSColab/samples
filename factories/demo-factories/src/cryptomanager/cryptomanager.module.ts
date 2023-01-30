import { DynamicModule, Provider } from '@nestjs/common';

import * as ccxt from 'ccxt';
import { CryptoManagerService } from './cryptomanager.services';

// Add any config options you need, like API keys, etc
export interface CryptoManagerModuleOptions {
  global?: boolean;
}

export const KRAKEN_CLIENT_TOKEN = 'KRAKEN_CLIENT_TOKEN';

export class CryptoManagerModule {
  static forRoot(options: CryptoManagerModuleOptions): DynamicModule {
    // An example of injecting a single class of ccxt.  Note this is only available
    // within this module.
    const krakenProvider: Provider = {
      provide: KRAKEN_CLIENT_TOKEN,
      useValue: new ccxt.kraken(),
    };

    return {
      module: CryptoManagerModule,
      providers: [krakenProvider, CryptoManagerService],
      // Exports can be @Inject()'ed to other files, and if global
      // is set, then forRoot only needs to be called in the AppModule
      exports: [CryptoManagerService],
      global: options.global,
    };
  }
}
