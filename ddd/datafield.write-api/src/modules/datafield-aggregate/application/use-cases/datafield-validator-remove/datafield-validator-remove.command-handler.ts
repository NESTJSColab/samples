import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { DataFieldTable } from '../../../../../database';
import { FeaturesCommandHandler, Id } from '../../../../../shared';
import {
  DataFieldTransactionRepository,
  DataFieldWriteRepository,
} from '../../../infrastructure';
import { DataFieldValidatorRemoveCommand } from './datafield-validator-remove.command';
import { DataFieldReadRepository } from '../../../infrastructure/db/datafield-read.repository';
import { EventStore } from 'nestjscolab.dddes';
import { DataField, DataFieldValidator } from '../../../domain';
import { DataFieldValidatorDeletedIntegrationEvent } from '../../integration-events/validator-deleted';

@CommandHandler(DataFieldValidatorRemoveCommand)
export class DataFieldValidatorRemoveCommandHandler extends FeaturesCommandHandler<
  DataFieldValidatorRemoveCommand,
  DataFieldTable,
  DataField
> {
  constructor(
    private readonly writeRepository: DataFieldWriteRepository,
    private readonly eventStore: EventStore,
    private readonly integrationEventBus: IntegrationEventBus,
    private readonly transactionalRepository: DataFieldTransactionRepository,
    private readonly readRepository: DataFieldReadRepository,
  ) {
    super(
      writeRepository,
      eventStore,
      integrationEventBus,
      transactionalRepository,
      readRepository,
    );
  }

  async execute(command: DataFieldValidatorRemoveCommand): Promise<any> {
    const { datafieldId, id } = command;

    const dataFieldTable = await this.loadDatatable(datafieldId);

    const datafield = DataField.load(dataFieldTable);

    datafield.removeValidator(
      DataFieldValidator.create({
        id: Id.setId(id),
        sequence: 0,
        name: 'foo',
      }),
      'foo',
    );

    await this.saveEventStore(datafield);

    await this.publishDomainEvents(datafield);

    await this.publicIntegrationEvents(
      new DataFieldValidatorDeletedIntegrationEvent(id),
    );
  }
}
