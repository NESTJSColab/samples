import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import {
  IIntegrationEventHandler,
  IntegrationEventHandler,
} from 'nestjscolab.ddd';

import { DataFieldValidatorAddedIntegrationEvent } from './validator-added.integrationevent';
import {
  DATAFIELD_SERVICE,
  DATAFIELD_VALIDATOR_PATTERN_ADD,
  eDATAFIELD_ACTION,
} from '../constants';

@IntegrationEventHandler(DataFieldValidatorAddedIntegrationEvent)
export class DataFieldValidatorAddedIntegrationEventHandler
  implements IIntegrationEventHandler<DataFieldValidatorAddedIntegrationEvent>
{
  constructor(
    @Inject(DATAFIELD_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: DataFieldValidatorAddedIntegrationEvent,
  ): Promise<any> {
    await this.clientProxy
      .send(
        { cmd: DATAFIELD_VALIDATOR_PATTERN_ADD },
        JSON.stringify({
          action: eDATAFIELD_ACTION.ADD_VALIDATOR,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
