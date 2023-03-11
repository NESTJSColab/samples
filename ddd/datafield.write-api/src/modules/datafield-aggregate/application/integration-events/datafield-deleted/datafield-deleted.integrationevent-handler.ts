import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import {
  DATAFIELD_PATTERN_DELETED,
  DATAFIELD_SERVICE,
  eDATAFIELD_ACTION,
} from '../constants';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import { DataFieldDeletedIntegrationEvent } from './datafield-deleted.integrationevent';

@IntegrationEventHandler(DataFieldDeletedIntegrationEvent)
export class DataFieldDeletedIntegrationEventHandler
  implements IIntegrationEventHandler<DataFieldDeletedIntegrationEvent>
{
  constructor(
    @Inject(DATAFIELD_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: DataFieldDeletedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: DATAFIELD_PATTERN_DELETED },
        JSON.stringify({
          action: eDATAFIELD_ACTION.LOCK,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
