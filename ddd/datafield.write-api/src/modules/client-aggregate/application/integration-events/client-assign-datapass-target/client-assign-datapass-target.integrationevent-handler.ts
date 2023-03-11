import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import {
  eCLIENT_ACTION,
  CLIENT_SERVICE,
  CLIENT_PATTERN_ADD_DATAPASS_TO_TARGET,
} from '../constants';
import { ClientDatapassTargetAddedIntegrationEvent } from './client-assign-datapass-target.integrationevent';

@IntegrationEventHandler(ClientDatapassTargetAddedIntegrationEvent)
export class ClientDatapassTargetAddedIntegrationEventHandler
  implements
    IIntegrationEventHandler<ClientDatapassTargetAddedIntegrationEvent>
{
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: ClientDatapassTargetAddedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: CLIENT_PATTERN_ADD_DATAPASS_TO_TARGET },
        JSON.stringify({
          action: eCLIENT_ACTION.TARGET_DATAPASS_ADDED,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
