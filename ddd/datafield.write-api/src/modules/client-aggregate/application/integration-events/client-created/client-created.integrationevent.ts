import { IntegrationEvent } from 'nestjscolab.ddd';

export class ClientCreatedIntegrationEvent extends IntegrationEvent {
  constructor(readonly id: string, readonly name: string) {
    super({
      eventName: ClientCreatedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
