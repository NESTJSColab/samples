import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { DataFieldValidatorAddCommand } from './datafield-validator-add.command';
import { EventStore } from 'nestjscolab.dddes';
import {
  DataFieldReadRepository,
  DataFieldTransactionRepository,
  DataFieldWriteRepository,
} from '../../../infrastructure';
import { DataField, DataFieldValidator } from '../../../domain';
import { FeaturesCommandHandler, Id } from '../../../../../shared';
import { DataFieldTable } from 'src/database';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { DataFieldValidatorAddedIntegrationEvent } from '../../integration-events/validator-added';

@CommandHandler(DataFieldValidatorAddCommand)
export class DataFieldValidatorAddCommandHandler extends FeaturesCommandHandler<
  DataFieldValidatorAddCommand,
  DataFieldTable,
  DataField
> {
  constructor(
    private readonly readRepository: DataFieldReadRepository,
    private readonly writeRepository: DataFieldWriteRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly transactionRepository: DataFieldTransactionRepository,
    private readonly eventStore: EventStore,
    private readonly integrationEventBus: IntegrationEventBus,
  ) {
    super(
      writeRepository,
      eventStore,
      integrationEventBus,
      transactionRepository,
    );
  }

  async execute(command: DataFieldValidatorAddCommand): Promise<any> {
    const { dataFieldId, validatorId, sequence, validatorName } = command;

    const dataFieldTable = await this.loadDatatable(dataFieldId);

    const datafield = DataField.load(dataFieldTable);

    datafield.addValidator(
      DataFieldValidator.create({
        id: Id.setId(validatorId),
        sequence,
        name: validatorName,
      }),
      'foo',
    );

    datafield.audit.update('foo');

    await this.saveEventStore(datafield);

    await this.publishDomainEvents(datafield);

    await this.publicIntegrationEvents(
      new DataFieldValidatorAddedIntegrationEvent(validatorId, validatorName),
    );
  }
}
