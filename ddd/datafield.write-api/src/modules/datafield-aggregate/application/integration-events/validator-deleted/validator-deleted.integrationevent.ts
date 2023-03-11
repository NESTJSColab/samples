import { IntegrationEvent } from 'nestjscolab.ddd';

export class DataFieldValidatorDeletedIntegrationEvent extends IntegrationEvent {
  constructor(readonly id: string) {
    super({
      eventName: DataFieldValidatorDeletedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
