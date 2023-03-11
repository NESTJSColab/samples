import { IntegrationEvent } from 'nestjscolab.ddd';

export class ClientTargetDeletedIntegrationEvent extends IntegrationEvent {
  constructor(readonly clientId: string, readonly targetId: string) {
    super({
      eventName: ClientTargetDeletedIntegrationEvent.name,
      aggregateId: clientId,
    });
  }
}
