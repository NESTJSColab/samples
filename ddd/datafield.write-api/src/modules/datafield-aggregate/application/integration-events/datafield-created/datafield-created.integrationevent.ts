import { IntegrationEvent } from 'nestjscolab.ddd';

export class DataFieldCreatedIntegrationEvent extends IntegrationEvent {
  constructor(
    readonly id: string,
    readonly sequence: number,
    readonly fieldName: string,
    readonly targetCode: string,
    readonly validatorName: string,
    readonly createdAt: Date,
    readonly createdBy: string,
    readonly status: string,
  ) {
    super({
      eventName: DataFieldCreatedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
