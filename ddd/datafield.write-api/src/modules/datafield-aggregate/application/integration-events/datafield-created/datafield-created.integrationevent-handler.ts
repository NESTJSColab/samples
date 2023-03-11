import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import { DataFieldCreatedIntegrationEvent } from './datafield-created.integrationevent';
import {
  DATAFIELD_PATTERN_NEW,
  DATAFIELD_SERVICE,
  eDATAFIELD_ACTION,
} from '../constants';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

@IntegrationEventHandler(DataFieldCreatedIntegrationEvent)
export class DataFieldCreatedIntegrationEventHandler
  implements IIntegrationEventHandler<DataFieldCreatedIntegrationEvent>
{
  constructor(
    @Inject(DATAFIELD_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: DataFieldCreatedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: DATAFIELD_PATTERN_NEW },
        JSON.stringify({
          action: eDATAFIELD_ACTION.NEW,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
