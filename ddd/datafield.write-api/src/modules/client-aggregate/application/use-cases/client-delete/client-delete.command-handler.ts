import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { ClientTable } from '../../../../../database';
import { FeaturesCommandHandler } from '../../../../../shared';
import { ClientDeletedIntegrationEvent } from '../../integration-events';

import { ClientDeleteCommand } from './client-delete.command';
import { Client } from '../../../domain';
import {
  ClientWriteRepository,
  ClientTransactionRepository,
  ClientReadRepository,
} from '../../../infrastructure/db';

@CommandHandler(ClientDeleteCommand)
export class ClientDeleteCommandHandler extends FeaturesCommandHandler<
  ClientDeleteCommand,
  ClientTable,
  Client
> {
  constructor(
    private readonly writeRepository: ClientWriteRepository,
    private readonly integrationEventBus: IntegrationEventBus,
    private readonly transactionalRepository: ClientTransactionRepository,
    private readonly readRepository: ClientReadRepository,
  ) {
    super(
      writeRepository,
      null,
      integrationEventBus,
      transactionalRepository,
      readRepository,
    );
  }

  async execute(command: ClientDeleteCommand): Promise<any> {
    const { id } = command;

    const client = Client.load(await this.loadDatatable(id));

    await this.writeRepository.delete(id);

    await this.publishDomainEvents(client);

    await this.publicIntegrationEvents(new ClientDeletedIntegrationEvent(id));
  }
}
