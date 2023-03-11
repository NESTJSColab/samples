import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import {
  eCLIENT_ACTION,
  CLIENT_SERVICE,
  CLIENT_PATTERN_DELETE_DATAPASS,
} from '../constants';
import { ClientDatapassDeletedIntegrationEvent } from './client-datapass-deleted.integrationevent';

@IntegrationEventHandler(ClientDatapassDeletedIntegrationEvent)
export class ClientDatapassDeletedIntegrationEventHandler
  implements IIntegrationEventHandler<ClientDatapassDeletedIntegrationEvent>
{
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: ClientDatapassDeletedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: CLIENT_PATTERN_DELETE_DATAPASS },
        JSON.stringify({
          action: eCLIENT_ACTION.DATAPASS_DELETE,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
