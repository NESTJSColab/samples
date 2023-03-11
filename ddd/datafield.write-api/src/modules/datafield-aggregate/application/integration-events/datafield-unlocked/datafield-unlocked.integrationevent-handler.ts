import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import {
  DATAFIELD_PATTERN_UNLOCKED,
  DATAFIELD_SERVICE,
  eDATAFIELD_ACTION,
} from '../constants';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';
import { DataFieldUnlockedIntegrationEvent } from './datafield-unlocked.integrationevent';

@IntegrationEventHandler(DataFieldUnlockedIntegrationEvent)
export class DataFieldUnlockedIntegrationEventHandler
  implements IIntegrationEventHandler<DataFieldUnlockedIntegrationEvent>
{
  constructor(
    @Inject(DATAFIELD_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: DataFieldUnlockedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: DATAFIELD_PATTERN_UNLOCKED },
        JSON.stringify({
          action: eDATAFIELD_ACTION.UNLOCK,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
