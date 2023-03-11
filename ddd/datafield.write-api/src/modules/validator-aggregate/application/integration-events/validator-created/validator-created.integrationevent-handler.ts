import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import {
  VALIDATOR_SERVICE,
  eVALIDATOR_ACTION,
  VALIDATOR_PATTERN_NEW,
} from '../constants';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';
import { ValidatorCreatedIntegrationEvent } from './validator-created.integrationevent';

@IntegrationEventHandler(ValidatorCreatedIntegrationEvent)
export class ValidatorCreatedIntegrationEventHandler
  implements IIntegrationEventHandler<ValidatorCreatedIntegrationEvent>
{
  constructor(
    @Inject(VALIDATOR_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: ValidatorCreatedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: VALIDATOR_PATTERN_NEW },
        JSON.stringify({
          action: eVALIDATOR_ACTION.NEW,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
