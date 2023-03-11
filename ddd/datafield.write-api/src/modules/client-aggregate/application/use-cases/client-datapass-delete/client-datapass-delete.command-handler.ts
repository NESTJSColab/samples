import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { Client } from '../../../domain';
import {
  ClientReadRepository,
  ClientTransactionRepository,
  ClientWriteRepository,
} from '../../../infrastructure/db';

import { FeaturesCommandHandler, Id } from '../../../../../shared';
import { ClientTable } from '../../../../../database';
import { ClientTargetDeletedIntegrationEvent } from '../../integration-events';
import { ClientDatapassDeleteCommand } from './client-datapass-delete.command';

@CommandHandler(ClientDatapassDeleteCommand)
export class ClientDatapassDeleteCommandHandler extends FeaturesCommandHandler<
  ClientDatapassDeleteCommand,
  ClientTable,
  Client
> {
  constructor(
    private readonly writeRepository: ClientWriteRepository,
    private readonly transactionRepository: ClientTransactionRepository,
    private readonly readRepository: ClientReadRepository,
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

  async execute(command: ClientDatapassDeleteCommand): Promise<any> {
    const { clientId, id } = command;

    const clientTable = await this.loadDatatable(clientId);

    const client = Client.load(clientTable);

    client.removeDatapass(Id.setId(id), 'foo');

    await this.saveEventStore(client);

    await this.transactionRepository.publishEvents(client, async () => {
      await this.writeRepository.save(client);
    });

    await this.integrationEventBus.execute(
      new ClientTargetDeletedIntegrationEvent(clientId, id),
    );
  }
}
