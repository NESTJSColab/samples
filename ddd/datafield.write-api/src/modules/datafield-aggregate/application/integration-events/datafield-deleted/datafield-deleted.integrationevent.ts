import { IntegrationEvent } from 'nestjscolab.ddd';

export class DataFieldDeletedIntegrationEvent extends IntegrationEvent {
  constructor(readonly id: string) {
    super({
      eventName: DataFieldDeletedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
