import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { Client, DatapassName, DatapassSequence } from '../../../domain';
import {
  ClientReadRepository,
  ClientTransactionRepository,
  ClientWriteRepository,
} from '../../../infrastructure/db';
import { FeaturesCommandHandler, Id } from '../../../../../shared';
import { ClientTable } from '../../../../../database';
import { ClientDatapassAddCommand } from './client-datapass-add.command';
import { ClientDatapassAddedIntegrationEvent } from '../../integration-events';

@CommandHandler(ClientDatapassAddCommand)
export class ClientDatapassAddCommandHandler extends FeaturesCommandHandler<
  ClientDatapassAddCommand,
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

  async execute(command: ClientDatapassAddCommand): Promise<any> {
    const { clientId, sequence, name } = command;

    const clientTable = await this.loadDatatable(clientId);

    const client = Client.load(clientTable);

    const datapass = client.addDatapass(
      Id.setId(clientId),
      DatapassSequence.create(sequence),
      DatapassName.create(name),
      'foo',
    );

    await this.saveEventStore(client);

    await this.transactionRepository.publishEvents(client, async () => {
      await this.writeRepository.save(client);
    });

    await this.integrationEventBus.execute(
      new ClientDatapassAddedIntegrationEvent(
        clientId,
        datapass.getId(),
        sequence,
        name,
      ),
    );
  }
}
