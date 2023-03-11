import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EventStore } from 'nestjscolab.dddes';

import { DataFieldTable } from '../../../../../database';
import { DataFieldChangeFieldNameCommand } from './datafield-change-name.command';
import { DataField } from '../../../domain';

import { DataFieldChangedFieldNameIntegrationEvent } from '../../integration-events';

import {
  DataFieldWriteRepository,
  DataFieldReadRepository,
  DataFieldTransactionRepository,
} from '../../../infrastructure/db';
import { FeaturesCommandHandler } from '../../../../../shared';

@CommandHandler(DataFieldChangeFieldNameCommand)
export class DataFieldChangeFieldNameCommandHanler extends FeaturesCommandHandler<
  DataFieldChangeFieldNameCommand,
  DataFieldTable,
  DataField
> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly writeRepository: DataFieldWriteRepository,
    private readonly readRepository: DataFieldReadRepository,
    private readonly transactionRepository: DataFieldTransactionRepository,
    private readonly eventStore: EventStore,
    private readonly integrationEventBus: IntegrationEventBus,
  ) {
    super(
      writeRepository,
      eventStore,
      integrationEventBus,
      transactionRepository,
      readRepository,
    );
  }

  async execute(command: DataFieldChangeFieldNameCommand): Promise<void> {
    const { id, newFieldName } = command;

    const datafieldTable = await this.loadDatatable(id);

    const datafield = DataField.load(datafieldTable);

    const originalFieldName = datafield.getPropsCopy().fieldName.unpack();

    datafield.changeFieldName(newFieldName, 'foo');

    await this.saveEventStore(datafield);

    await this.publishDomainEvents(datafield);

    await this.publicIntegrationEvents(
      new DataFieldChangedFieldNameIntegrationEvent(
        id,
        originalFieldName,
        newFieldName,
        new Date(),
      ),
    );
  }
}
