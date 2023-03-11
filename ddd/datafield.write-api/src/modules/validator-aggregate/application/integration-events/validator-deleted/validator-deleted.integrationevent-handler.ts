import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import {
  VALIDATOR_SERVICE,
  eVALIDATOR_ACTION,
  VALIDATOR_PATTERN_DELETED,
} from '../constants';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';
import { ValidatorDeletedIntegrationEvent } from './validator-deleted.integrationevent';

@IntegrationEventHandler(ValidatorDeletedIntegrationEvent)
export class ValidatorDeletedIntegrationEventHandler
  implements IIntegrationEventHandler<ValidatorDeletedIntegrationEvent>
{
  constructor(
    @Inject(VALIDATOR_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: ValidatorDeletedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: VALIDATOR_PATTERN_DELETED },
        JSON.stringify({
          action: eVALIDATOR_ACTION.DELETE,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
