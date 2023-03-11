import { Injectable } from '@nestjs/common';
import { DomainEventPublisher } from 'nestjscolab.ddd';

import { DatabaseException } from '../../../../database';
import { DataField, ITransationDataFieldRepository } from '../../domain';

@Injectable()
export class DataFieldTransactionRepository
  implements ITransationDataFieldRepository
{
  constructor(private readonly publisher: DomainEventPublisher) {}

  async publishEvents(
    aggregate: DataField,
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
