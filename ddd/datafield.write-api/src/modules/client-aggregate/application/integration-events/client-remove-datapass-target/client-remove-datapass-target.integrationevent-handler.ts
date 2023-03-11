import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import {
  eCLIENT_ACTION,
  CLIENT_SERVICE,
  CLIENT_PATTERN_REMOVE_DATAPASS_TO_TARGET,
} from '../constants';
import { ClientDatapassTargetRemovedIntegrationEvent } from './client-remove-datapass-target.integrationevent';

@IntegrationEventHandler(ClientDatapassTargetRemovedIntegrationEvent)
export class ClientDatapassTargetRemovedIntegrationEventHandler
  implements
    IIntegrationEventHandler<ClientDatapassTargetRemovedIntegrationEvent>
{
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: ClientDatapassTargetRemovedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: CLIENT_PATTERN_REMOVE_DATAPASS_TO_TARGET },
        JSON.stringify({
          action: eCLIENT_ACTION.TARGET_DATAPASS_ADDED,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
