import { IntegrationEventHandler } from 'nestjscolab.ddd';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import {
  DATAFIELD_SERVICE,
  DATAFIELD_PATTERN_CHANGE_NAME,
  eDATAFIELD_ACTION,
} from '../constants';
import { DataFieldChangedFieldNameIntegrationEvent } from './datafield-changed-fieldname.integrationevent';
import { IIntegrationEventHandler } from 'nestjscolab.ddd';

@IntegrationEventHandler(DataFieldChangedFieldNameIntegrationEvent)
export class DataFieldChangedFieldNameIntegrationEventHandler
  implements
    IIntegrationEventHandler<DataFieldChangedFieldNameIntegrationEvent>
{
  constructor(
    @Inject(DATAFIELD_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async execute(
    integrationEvent: DataFieldChangedFieldNameIntegrationEvent,
  ): Promise<void> {
    await this.clientProxy
      .send(
        { cmd: DATAFIELD_PATTERN_CHANGE_NAME },
        JSON.stringify({
          action: eDATAFIELD_ACTION.CHANGE_FIELDNAME,
          data: integrationEvent,
        }),
      )
      .subscribe((event) => console.log(`Integration Event sent:${event}`));
  }
}
