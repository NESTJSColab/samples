import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import { DATAFIELD_SERVICE, eDATAFIELD_ACTION } from '../constants';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';
import { DataFieldValidatorDeletedIntegrationEvent } from './validator-deleted.integrationevent';
import { DATAFIELD_VALIDATOR_PATTERN_REMOVEED } from '../constants';

@IntegrationEventHandler(DataFieldValidatorDeletedIntegrationEvent)
export class DataFieldValidatorDeletedIntegrationEventHandler
  implements
    IIntegrationEventHandler<DataFieldValidatorDeletedIntegrationEvent>
{
  constructor(
    @Inject(DATAFIELD_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: DataFieldValidatorDeletedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: DATAFIELD_VALIDATOR_PATTERN_REMOVEED },
        JSON.stringify({
          action: eDATAFIELD_ACTION.REMOVE_VALIDATOR,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
