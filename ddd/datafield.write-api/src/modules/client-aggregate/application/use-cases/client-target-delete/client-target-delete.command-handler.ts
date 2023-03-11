import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { Client } from '../../../domain';
import {
  ClientReadRepository,
  ClientTransactionRepository,
  ClientWriteRepository,
} from './../../../infrastructure/db';

import { FeaturesCommandHandler, Id } from '../../../../../shared';
import { ClientTable } from '../../../../../database';
import { ClientTargetDeleteCommand } from './client-target-delete.command';
import { ClientTargetDeletedIntegrationEvent } from '../../integration-events';

@CommandHandler(ClientTargetDeleteCommand)
export class ClientTargetDeleteCommandHanler extends FeaturesCommandHandler<
  ClientTargetDeleteCommand,
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

  async execute(command: ClientTargetDeleteCommand): Promise<any> {
    const { clientId, id } = command;

    const clientTable = await this.loadDatatable(clientId);

    const client = Client.load(clientTable);

    client.removeTarget(Id.setId(id), 'foo');

    await this.saveEventStore(client);

    await this.transactionRepository.publishEvents(client, async () => {
      await this.writeRepository.save(client);
    });

    await this.integrationEventBus.execute(
      new ClientTargetDeletedIntegrationEvent(clientId, id),
    );
  }
}
