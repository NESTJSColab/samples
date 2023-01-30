import { Inject, Injectable } from '@nestjs/common';

import { kraken } from 'ccxt';
import { KRAKEN_CLIENT_TOKEN } from './cryptomanager.module';

@Injectable()
export class CryptoManagerService {
  constructor(@Inject(KRAKEN_CLIENT_TOKEN) private mykraken: kraken) {}

  loadKrakenMarkets() {
    return this.mykraken.loadMarkets();
  }
}
