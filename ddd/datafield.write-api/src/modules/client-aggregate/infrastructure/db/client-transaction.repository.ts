import { Injectable } from '@nestjs/common';
import { DomainEventPublisher } from 'nestjscolab.ddd';

import { DatabaseException } from '../../../../database';
import { Client, IClientTransactionRepository } from '../../domain';

@Injectable()
export class ClientTransactionRepository
  implements IClientTransactionRepository
{
  constructor(private readonly publisher: DomainEventPublisher) {}

  async publishEvents(
    aggregate: Client,
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
