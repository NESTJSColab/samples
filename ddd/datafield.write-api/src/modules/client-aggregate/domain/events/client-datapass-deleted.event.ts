import { DomainEvent } from 'nestjscolab.ddd';

export class ClientDatapassDeletedDomainEvent extends DomainEvent {
  constructor(readonly clientId: string, readonly id: string) {
    super({
      eventName: ClientDatapassDeletedDomainEvent.name,
      aggregateId: clientId,
    });
  }

  toPlain() {
    return {
      clientId: this.aggregateId,
      id: this.id,
    };
  }
}
