import { IntegrationEvent } from 'nestjscolab.ddd';

export class ClientDatapassDeletedIntegrationEvent extends IntegrationEvent {
  constructor(readonly clientId: string, readonly datapassId: string) {
    super({
      eventName: ClientDatapassDeletedIntegrationEvent.name,
      aggregateId: clientId,
    });
  }
}
