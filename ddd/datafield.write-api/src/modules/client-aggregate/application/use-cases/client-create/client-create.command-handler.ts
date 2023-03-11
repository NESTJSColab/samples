import { CommandHandler, IntegrationEventBus } from 'nestjscolab.ddd';

import { FeaturesCommandHandler, Id } from '../../../../../shared';
import { ClientTable } from '../../../../../database';
import {
  eClientStatus,
  ClientName,
  TargetName,
  DatapassSequence,
  DatapassName,
  Client,
} from '../../../domain';
import {
  ClientWriteRepository,
  ClientTransactionRepository,
  ClientReadRepository,
} from '../../../infrastructure/db';
import { ClientCreateCommand } from './client-create.command';
import { ClientCreatedIntegrationEvent } from '../../integration-events';

@CommandHandler(ClientCreateCommand)
export class ClientCreateCommandHanler extends FeaturesCommandHandler<
  ClientCreateCommand,
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

  async execute(command: ClientCreateCommand): Promise<any> {
    const { name, targets, datapasses } = command;

    const client = Client.create(
      {
        name: ClientName.create(name),
        datapasses: [],
        targets: [],
        status: eClientStatus.ACTIVE,
      },
      'foo',
    );

    datapasses.forEach((d) =>
      client.addDatapass(
        Id.setId(client.getId()),
        DatapassSequence.create(d.sequence),
        DatapassName.create(d.name),
        'foo',
      ),
    );

    targets.forEach((t) => {
      client.addTarget(
        Id.setId(client.getId()),
        TargetName.create(t.name),
        'foo',
      );
    });

    await this.saveEventStore(client);

    await this.publishDomainEvents(client);

    await this.publicIntegrationEvents(
      new ClientCreatedIntegrationEvent(client.getId(), name),
    );
  }
}
