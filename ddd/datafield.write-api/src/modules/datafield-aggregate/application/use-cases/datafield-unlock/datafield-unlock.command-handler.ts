import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EventStore } from 'nestjscolab.dddes';

import {
  DataFieldReadRepository,
  DataFieldTransactionRepository,
  DataFieldWriteRepository,
} from '../../../infrastructure/db';
import { DataField, eDatafieldStatus } from '../../../domain';
import { DataFieldUnlockCommand } from './datafield-unlock.command';
import { DataFieldUnlockedIntegrationEvent } from '../../integration-events';
import { FeaturesCommandHandler } from '../../../../../shared';
import { DataFieldTable } from '../../../../../database';

@CommandHandler(DataFieldUnlockCommand)
export class DataFieldUnlockCommandHanler extends FeaturesCommandHandler<
  DataFieldUnlockCommand,
  DataFieldTable,
  DataField
> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly readRepository: DataFieldReadRepository,
    private readonly transactionRepository: DataFieldTransactionRepository,
    private readonly writeRepository: DataFieldWriteRepository,
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

  async execute(command: DataFieldUnlockCommand): Promise<void> {
    const { id } = command;

    const datafieldTable = await this.loadDatatable(id);

    const datafield = DataField.load(datafieldTable);

    datafield.unlock('foo');

    await this.saveEventStore(datafield);

    await this.publishDomainEvents(datafield);

    await this.publicIntegrationEvents(
      new DataFieldUnlockedIntegrationEvent(id, eDatafieldStatus.UNLOCKED),
    );
  }
}
