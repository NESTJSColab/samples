import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import {
  DATAFIELD_PATTERN_LOCKED,
  DATAFIELD_SERVICE,
  eDATAFIELD_ACTION,
} from '../constants';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';
import { DataFieldLockedIntegrationEvent } from './datafield-locked.integrationevent';

@IntegrationEventHandler(DataFieldLockedIntegrationEvent)
export class DataFieldLockedIntegrationEventHandler
  implements IIntegrationEventHandler<DataFieldLockedIntegrationEvent>
{
  constructor(
    @Inject(DATAFIELD_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: DataFieldLockedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: DATAFIELD_PATTERN_LOCKED },
        JSON.stringify({
          action: eDATAFIELD_ACTION.LOCK,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
