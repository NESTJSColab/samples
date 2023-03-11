import { IntegrationEvent } from 'nestjscolab.ddd';

export class ClientTargetAddedIntegrationEvent extends IntegrationEvent {
  constructor(
    readonly clientId: string,
    readonly id: string,
    readonly name: string,
  ) {
    super({
      eventName: ClientTargetAddedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
