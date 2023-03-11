import { DomainEvent } from 'nestjscolab.ddd';

export class DataFieldLockedDomainEvent extends DomainEvent {
  constructor(readonly aggregateId: string, readonly status: string) {
    super({ eventName: DataFieldLockedDomainEvent.name, aggregateId });
  }

  toPlain() {
    return {
      id: this.aggregateId,
      status,
    };
  }
}
