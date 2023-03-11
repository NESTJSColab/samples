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
import { DataFieldLockCommand } from './datafield-lock.command';
import { DataFieldLockedIntegrationEvent } from '../../integration-events';
import { DataFieldTable } from '../../../../../database';
import { FeaturesCommandHandler } from '../../../../../shared';

@CommandHandler(DataFieldLockCommand)
export class DataFieldLockCommandHanler extends FeaturesCommandHandler<
  DataFieldLockCommand,
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

  async execute(command: DataFieldLockCommand): Promise<void> {
    const { id } = command;

    const dataFieldTable = await this.loadDatatable(id);

    const datafield = DataField.load(dataFieldTable);

    const originalStatus = datafield.getPropsCopy().status;

    datafield.lock('foo');

    await this.saveEventStore(datafield);

    await this.publishDomainEvents(datafield);

    await this.publicIntegrationEvents(
      new DataFieldLockedIntegrationEvent(
        id,
        originalStatus,
        eDatafieldStatus.LOCKED,
      ),
    );
  }
}
