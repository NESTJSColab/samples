import {
  CommandHandler,
  IntegrationEventBus,
  ICommandHandler,
} from 'nestjscolab.ddd';
import { EventStore } from 'nestjscolab.dddes';

import { ClientRemoveDatapassFromTargetCommand } from './client-remove-datapass-target.command';
import { Client, Datapass } from '../../../domain';
import {
  ClientReadRepository,
  ClientTransactionRepository,
  ClientWriteRepository,
} from '../../../infrastructure/db';
import { ClientDatapassTargetRemovedIntegrationEvent } from '../../integration-events';

@CommandHandler(ClientRemoveDatapassFromTargetCommand)
export class ClientRemoveDatapaseToTargetCommandHanler
  implements ICommandHandler<ClientRemoveDatapassFromTargetCommand>
{
  constructor(
    private readonly readRepository: ClientReadRepository,
    private readonly writeRepository: ClientWriteRepository,
    private readonly transactionRepository: ClientTransactionRepository,
    private readonly eventStore: EventStore,
    private readonly integrationEventBus: IntegrationEventBus,
  ) {}

  async execute(command: ClientRemoveDatapassFromTargetCommand): Promise<any> {
    const { targetId, datapassId } = command;

    const targetTable = await this.readRepository.fetchTargetById(targetId);

    if (!targetTable)
      throw new Error(`Target with id:${targetId} does not exists.`);

    const datapassTable = this.readRepository.fetchDatapassById(datapassId);

    if (!datapassTable)
      throw new Error(`Datapass with id:${datapassId} does not exists.`);

    const datapass = Datapass.load(datapassTable);

    const clientTable = await this.readRepository.fetchById(
      datapass.getPropsCopy().clientId.unpack(),
    );

    const client = Client.load(clientTable);

    const target = client.removeDatapassFromTarget(targetId, datapass, 'foo');

    await this.eventStore.saveEvents(
      client.getId(),
      client.getDomainEvents,
      client.getVersion(),
    );

    await this.transactionRepository.publishEvents(client, async () => {
      await this.writeRepository.removeDatapassToTarget(target);
    });

    await this.integrationEventBus.execute(
      new ClientDatapassTargetRemovedIntegrationEvent(
        client.getId(),
        target.getId(),
        datapass.getId(),
      ),
    );
  }
}
