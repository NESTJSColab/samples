import { IntegrationEvent } from 'nestjscolab.ddd';

export class ClientDeletedIntegrationEvent extends IntegrationEvent {
  constructor(readonly id: string) {
    super({
      eventName: ClientDeletedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
