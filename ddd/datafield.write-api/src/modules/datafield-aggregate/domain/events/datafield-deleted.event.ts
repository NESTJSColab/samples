import { DomainEvent } from 'nestjscolab.ddd';

export class DataFieldDeletedDomainEvent extends DomainEvent {
  constructor(readonly id: string) {
    super({ eventName: DataFieldDeletedDomainEvent.name, aggregateId: id });
  }

  toPlain() {
    return {
      id: this.id,
    };
  }
}
