import { Injectable } from '@nestjs/common';
import { DomainEventPublisher } from 'nestjscolab.ddd';

import { DatabaseException } from '../../../../database';
import { Validator, ITransationValidatorRepository } from '../../domain';

@Injectable()
export class ValidatorTransactionRepository
  implements ITransationValidatorRepository
{
  constructor(private readonly publisher: DomainEventPublisher) {}

  async publishEvents(
    aggregate: Validator,
    handler: () => Promise<void>,
  ): Promise<void> {
    try {
      await handler();

      const domainEvents = this.publisher.mergeObjectContext(aggregate);

      domainEvents.commit();
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
