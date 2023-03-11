import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import {
  CLIENT_SERVICE,
  eCLIENT_ACTION,
  CLIENT_PATTERN_DELETED,
} from '../constants';

import { ClientDeletedIntegrationEvent } from './client-deleted.integrationevent';

@IntegrationEventHandler(ClientDeletedIntegrationEvent)
export class ClientDeletedIntegrationEventHandler
  implements IIntegrationEventHandler<ClientDeletedIntegrationEvent>
{
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(integrationEvent: ClientDeletedIntegrationEvent): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: CLIENT_PATTERN_DELETED },
        JSON.stringify({
          action: eCLIENT_ACTION.DELETE,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
