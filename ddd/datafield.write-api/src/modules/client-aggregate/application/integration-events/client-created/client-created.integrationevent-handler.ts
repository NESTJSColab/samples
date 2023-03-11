import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import {
  CLIENT_PATTERN_NEW,
  eCLIENT_ACTION,
  CLIENT_SERVICE,
} from '../constants';
import { ClientCreatedIntegrationEvent } from './client-created.integrationevent';

@IntegrationEventHandler(ClientCreatedIntegrationEvent)
export class ClientCreatedIntegrationEventHandler
  implements IIntegrationEventHandler<ClientCreatedIntegrationEvent>
{
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(integrationEvent: ClientCreatedIntegrationEvent): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: CLIENT_PATTERN_NEW },
        JSON.stringify({
          action: eCLIENT_ACTION.NEW,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
