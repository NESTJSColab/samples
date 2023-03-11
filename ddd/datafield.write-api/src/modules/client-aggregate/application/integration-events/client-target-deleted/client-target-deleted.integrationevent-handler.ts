import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import {
  eCLIENT_ACTION,
  CLIENT_SERVICE,
  CLIENT_PATTERN_DELETE_TARGET,
} from '../constants';
import { ClientTargetDeletedIntegrationEvent } from './client-target-deleted.integrationevent';

@IntegrationEventHandler(ClientTargetDeletedIntegrationEvent)
export class ClientTargetDeletedIntegrationEventHandler
  implements IIntegrationEventHandler<ClientTargetDeletedIntegrationEvent>
{
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: ClientTargetDeletedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: CLIENT_PATTERN_DELETE_TARGET },
        JSON.stringify({
          action: eCLIENT_ACTION.TARGET_DELETE,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
