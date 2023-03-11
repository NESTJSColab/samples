import { IntegrationEvent } from 'nestjscolab.ddd';

export class DataFieldChangedFieldNameIntegrationEvent extends IntegrationEvent {
  constructor(
    readonly id: string,
    readonly originalFieldName: string,
    readonly newFieldName: string,
    readonly ocurredOn: Date,
  ) {
    super({
      eventName: DataFieldChangedFieldNameIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
