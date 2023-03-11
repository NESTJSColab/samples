import { DataFieldDeletedIntegrationEvent } from '../../integration-events';
import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EventStore } from 'nestjscolab.dddes';

import {
  DataFieldReadRepository,
  DataFieldTransactionRepository,
  DataFieldWriteRepository,
} from '../../../infrastructure/db';
import { DataField } from '../../../domain';
import { DataFieldDeleteCommand } from './datafield-delete.command';
import { DataFieldTable } from '../../../../../database';
import { FeaturesCommandHandler } from '../../../../../shared';

@CommandHandler(DataFieldDeleteCommand)
export class DataFieldDeleteCommandHanler extends FeaturesCommandHandler<
  DataFieldDeleteCommand,
  DataFieldTable,
  DataField
> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly readRepository: DataFieldReadRepository,
    private readonly transactionRepository: DataFieldTransactionRepository,
    private readonly writeRepository: DataFieldWriteRepository,
    private readonly integrationEventBus: IntegrationEventBus,
    private readonly eventStore: EventStore,
  ) {
    super(
      writeRepository,
      eventStore,
      integrationEventBus,
      transactionRepository,
      readRepository,
    );
  }

  async execute(command: DataFieldDeleteCommand): Promise<void> {
    const { id } = command;

    const datafieldTable = await this.loadDatatable(id);

    const datafield = DataField.load(datafieldTable);

    datafield.delete('foo');

    await this.saveEventStore(datafield);

    await this.publishDomainEvents(datafield);

    await this.publicIntegrationEvents(
      new DataFieldDeletedIntegrationEvent(id),
    );
  }
}
