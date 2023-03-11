import { IntegrationEvent } from 'nestjscolab.ddd';

export class DataFieldValidatorAddedIntegrationEvent extends IntegrationEvent {
  constructor(readonly id: string, readonly name: string) {
    super({
      eventName: DataFieldValidatorAddedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
