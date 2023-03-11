import { DddCommandHandler } from 'nestjscolab.ddd';
import { DddEs } from 'nestjscolab.dddes';
import { EbEventBus } from 'nestjscolab.eb';

import { ClientAssingDatapassToTargetCommand } from './client-assign-datapass-target.command';
import { Client, Datapass } from '../../../domain';
import { ClientDatapassTargetAddedIntegrationEvent } from '../../integration-events';
import { FeaturesCommandHandler } from '../../../../../shared/commandhandler.base';

@DddCommandHandler(ClientAssingDatapassToTargetCommand)
export class ClientAssignDatapaseToTargetCommandHanler extends FeaturesCommandHandler<
  ClientAssingDatapassToTargetCommand,
  Client
> {
  constructor(
    private readonly eventStore: DddEs,
    private readonly eventBus: EbEventBus,
  ) {
    super();
  }

  async execute(command: ClientAssingDatapassToTargetCommand): Promise<any> {
    const { clientId, targetId, datapassId } = command;

    const clientData = await this.eventStore.getEventsForAggregate(clientId);

    client.

    const client = Client.load(clientTable);

    const target = client.AssignDatapassToTarget(targetId, datapass, 'foo');

    await this.eventStore.saveEvents(
      client.getId(),
      client.getDomainEvents,
      client.getVersion(),
    );

    await this.transactionRepository.publishEvents(client, async () => {
      await this.writeRepository.saveDatapassToTarget(target);
    });

    const { sequence, name } = datapass.getPropsCopy();

    await this.integrationEventBus.execute(
      new ClientDatapassTargetAddedIntegrationEvent(
        client.getId(),
        target.getId(),
        datapass.getId(),
        sequence.unpack(),
        name.unpack(),
      ),
    );
  }
}
