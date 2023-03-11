import { IntegrationEvent } from 'nestjscolab.ddd';

export class DataFieldUnlockedIntegrationEvent extends IntegrationEvent {
  constructor(readonly id: string, readonly newStatus: string) {
    super({
      eventName: DataFieldUnlockedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
