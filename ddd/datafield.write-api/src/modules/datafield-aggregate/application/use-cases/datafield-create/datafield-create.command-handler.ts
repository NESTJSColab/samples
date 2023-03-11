import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';
import { EventStore } from 'nestjscolab.dddes';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import {
  DataField,
  DataFieldName,
  DatafieldSequence,
  DatafieldTarget,
  eDatafieldStatus,
} from '../../../domain';
import { DataFieldTable } from '../../../../../database';
import { DataFieldCreateCommand } from './datafield-create.command';
import { DataFieldCreatedIntegrationEvent } from '../../integration-events';
import {
  DataFieldWriteRepository,
  DataFieldTransactionRepository,
} from '../../../infrastructure/db';
import { FeaturesCommandHandler, Id } from '../../../../../shared';
import { DataFieldValidator } from '../../../domain/datafield.validator';

@CommandHandler(DataFieldCreateCommand)
export class DataFieldCreateCommandHanler extends FeaturesCommandHandler<
  DataFieldCreateCommand,
  DataFieldTable,
  DataField
> {
  constructor(
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

  async execute(command: DataFieldCreateCommand): Promise<any> {
    const { target, fieldName, sequence, validators } = command;

    const datafield = DataField.create(
      {
        target: DatafieldTarget.create(target.id, target.code, target.name),
        sequence: DatafieldSequence.create(sequence),
        fieldName: DataFieldName.create(fieldName),
        validators: [],
        status: eDatafieldStatus.ACTIVE,
      },
      'foo',
    );

    validators.forEach((v) => {
      datafield.addValidator(
        DataFieldValidator.create({
          id: Id.setId(v.validatorId),
          sequence: v.sequence,
          name: v.name,
        }),
        'foo',
      );
    });

    await this.saveEventStore(datafield);

    await this.publishDomainEvents(datafield);

    await this.publicIntegrationEvents(
      new DataFieldCreatedIntegrationEvent(
        datafield.getId(),
        sequence,
        fieldName,
        target.code,
        '',
        new Date(),
        'foo',
        eDatafieldStatus.ACTIVE,
      ),
    );
  }
}
