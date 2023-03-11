import { DomainEvent } from 'nestjscolab.ddd';

export class DataFieldUnlockedDomainEvent extends DomainEvent {
  constructor(readonly aggregateId: string, readonly status: string) {
    super({ eventName: DataFieldUnlockedDomainEvent.name, aggregateId });
  }

  toPlain() {
    return {
      id: this.aggregateId,
      status,
    };
  }
}
