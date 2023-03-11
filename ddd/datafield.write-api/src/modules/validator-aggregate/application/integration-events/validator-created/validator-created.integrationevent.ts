import { IntegrationEvent } from 'nestjscolab.ddd';

export class ValidatorCreatedIntegrationEvent extends IntegrationEvent {
  constructor(readonly id: string, readonly name: string) {
    super({
      eventName: ValidatorCreatedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
