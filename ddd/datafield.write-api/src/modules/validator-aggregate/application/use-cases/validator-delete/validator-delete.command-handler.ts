import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { ValidatorTable } from '../../../../../database';
import { Validator } from '../../../domain';
import { ValidatorDeleteCommand } from './validator-delete.command';
import { FeaturesCommandHandler } from '../../../../../shared';
import {
  ValidatorReadRepository,
  ValidatorTransactionRepository,
  ValidatorWriteRepository,
} from '../../../infrastructure';
import { ValidatorDeletedIntegrationEvent } from '../../integration-events';

@CommandHandler(ValidatorDeleteCommand)
export class ValidatorDeleteCommandHandler extends FeaturesCommandHandler<
  ValidatorDeleteCommand,
  ValidatorTable,
  Validator
> {
  constructor(
    private readonly writeRepository: ValidatorWriteRepository,
    private readonly integrationEventBus: IntegrationEventBus,
    private readonly transactionalRepository: ValidatorTransactionRepository,
    private readonly readRepository: ValidatorReadRepository,
  ) {
    super(
      writeRepository,
      null,
      integrationEventBus,
      transactionalRepository,
      readRepository,
    );
  }

  async execute(command: ValidatorDeleteCommand): Promise<any> {
    const { id } = command;

    const validatorTable = await this.loadDatatable(id);

    const validator = Validator.load(validatorTable);

    await this.writeRepository.delete(id);

    await this.publishDomainEvents(validator);

    await this.publicIntegrationEvents(
      new ValidatorDeletedIntegrationEvent(id),
    );
  }
}
