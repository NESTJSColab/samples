import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import {
  eCLIENT_ACTION,
  CLIENT_SERVICE,
  CLIENT_PATTERN_ADD_DATAPASS,
} from '../constants';
import { ClientDatapassAddedIntegrationEvent } from './client-Datapass-added.integrationevent';

@IntegrationEventHandler(ClientDatapassAddedIntegrationEvent)
export class ClientDatapassAddedIntegrationEventHandler
  implements IIntegrationEventHandler<ClientDatapassAddedIntegrationEvent>
{
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: ClientDatapassAddedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: CLIENT_PATTERN_ADD_DATAPASS },
        JSON.stringify({
          action: eCLIENT_ACTION.DATAPASS_ADD,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
