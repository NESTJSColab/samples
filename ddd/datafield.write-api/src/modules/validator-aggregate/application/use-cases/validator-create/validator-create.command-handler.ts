import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { FeaturesCommandHandler } from '../../../../../shared';
import { ValidatorTable } from '../../../../../database';
import { eValidatorStatus, Validator, ValidatorName } from '../../../domain';
import {
  ValidatorReadRepository,
  ValidatorTransactionRepository,
  ValidatorWriteRepository,
} from '../../../infrastructure';
import { ValidatorCreateCommand } from './validator-create.command';
import { ValidatorCreatedIntegrationEvent } from '../../integration-events';

@CommandHandler(ValidatorCreateCommand)
export class ValidatorCreateCommandHanler extends FeaturesCommandHandler<
  ValidatorCreateCommand,
  ValidatorTable,
  Validator
> {
  constructor(
    private readonly writeRepository: ValidatorWriteRepository,
    private readonly transactionRepository: ValidatorTransactionRepository,
    private readonly readRepository: ValidatorReadRepository,
    private readonly integrationEventBus: IntegrationEventBus,
  ) {
    super(
      writeRepository,
      null,
      integrationEventBus,
      transactionRepository,
      readRepository,
    );
  }

  async execute(command: ValidatorCreateCommand): Promise<any> {
    const { name } = command;

    const validator = Validator.create(
      {
        name: ValidatorName.create(name),
        status: eValidatorStatus.ACTIVE,
      },
      'foo',
    );

    await this.saveEventStore(validator);

    await this.publishDomainEvents(validator);

    await this.publicIntegrationEvents(
      new ValidatorCreatedIntegrationEvent(validator.getId(), name),
    );
  }
}
