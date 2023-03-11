import { DomainEvent } from 'nestjscolab.ddd';

export class ClientDeletedDomainEvent extends DomainEvent {
  constructor(readonly aggregateId: string, readonly id: string) {
    super({ eventName: ClientDeletedDomainEvent.name, aggregateId });
  }

  toPlain() {
    return {
      aggregateId: this.aggregateId,
      id: this.id,
    };
  }
}
