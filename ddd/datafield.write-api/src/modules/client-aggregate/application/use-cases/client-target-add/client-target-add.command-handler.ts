import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { Client, TargetName } from '../../../domain';
import {
  ClientReadRepository,
  ClientTransactionRepository,
  ClientWriteRepository,
} from './../../../infrastructure/db';
import { ClientTargetAddCommand } from './client-target-add.command';
import { FeaturesCommandHandler, Id } from '../../../../../shared';
import { ClientTable } from '../../../../../database';
import { ClientTargetAddedIntegrationEvent } from '../../integration-events/client-target-added';

@CommandHandler(ClientTargetAddCommand)
export class ClientTargetAddCommandHanler extends FeaturesCommandHandler<
  ClientTargetAddCommand,
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

  async execute(command: ClientTargetAddCommand): Promise<any> {
    const { clientId, name } = command;

    const clientTable = await this.loadDatatable(clientId);

    const client = Client.load(clientTable);

    const target = client.addTarget(
      Id.setId(clientId),
      TargetName.create(name),
      'foo',
    );

    await this.saveEventStore(client);

    await this.transactionRepository.publishEvents(client, async () => {
      await this.writeRepository.save(client);
    });

    await this.integrationEventBus.execute(
      new ClientTargetAddedIntegrationEvent(
        client.getId(),
        target.getId(),
        target.getPropsCopy().name.unpack(),
      ),
    );
  }
}
