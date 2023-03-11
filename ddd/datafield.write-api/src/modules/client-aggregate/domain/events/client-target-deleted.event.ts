import { DomainEvent } from 'nestjscolab.ddd';

export class ClientTargetDeletedDomainEvent extends DomainEvent {
  constructor(readonly clientId: string, readonly id: string) {
    super({
      eventName: ClientTargetDeletedDomainEvent.name,
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
