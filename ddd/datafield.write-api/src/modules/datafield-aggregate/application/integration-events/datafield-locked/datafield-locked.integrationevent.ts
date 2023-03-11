import { IntegrationEvent } from 'nestjscolab.ddd';

export class DataFieldLockedIntegrationEvent extends IntegrationEvent {
  constructor(
    readonly id: string,
    readonly originalStatus: string,
    readonly newStatus: string,
  ) {
    super({
      eventName: DataFieldLockedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
