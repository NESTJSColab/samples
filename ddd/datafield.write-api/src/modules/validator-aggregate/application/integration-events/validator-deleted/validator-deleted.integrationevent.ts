import { IntegrationEvent } from 'nestjscolab.ddd';

export class ValidatorDeletedIntegrationEvent extends IntegrationEvent {
  constructor(readonly id: string) {
    super({
      eventName: ValidatorDeletedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
