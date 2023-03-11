import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import {
  eCLIENT_ACTION,
  CLIENT_SERVICE,
  CLIENT_PATTERN_ADD_TARGET,
} from '../constants';
import { ClientTargetAddedIntegrationEvent } from './client-target-added.integrationevent';

@IntegrationEventHandler(ClientTargetAddedIntegrationEvent)
export class ClientTargetAddedIntegrationEventHandler
  implements IIntegrationEventHandler<ClientTargetAddedIntegrationEvent>
{
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: ClientTargetAddedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: CLIENT_PATTERN_ADD_TARGET },
        JSON.stringify({
          action: eCLIENT_ACTION.TARGET_ADD,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
