import { DomainEvent } from 'nestjscolab.ddd';

export class DataFieldChangeFieldNameDomainEvent extends DomainEvent {
  constructor(
    readonly aggregateId: string,
    readonly oldFieldName: string,
    readonly newFieldName: string,
  ) {
    super({
      eventName: DataFieldChangeFieldNameDomainEvent.name,
      aggregateId: aggregateId,
    });
  }

  toPlain() {
    return {
      id: this.aggregateId,
      oldFieldName: this.oldFieldName,
      newFieldName: this.newFieldName,
    };
  }
}
