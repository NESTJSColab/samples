import { DomainEvent } from 'nestjscolab.ddd';

export class ClientDatapassAddedDomainEvent extends DomainEvent {
  constructor(
    readonly clientId: string,
    readonly id: string,
    readonly sequence: number,
    readonly name: string,
    readonly createdAt: Date,
    readonly createdBy: string,
    readonly status: string,
  ) {
    super({
      eventName: ClientDatapassAddedDomainEvent.name,
      aggregateId: clientId,
    });
  }

  toPlain() {
    return {
      clientId: this.aggregateId,
      id: this.id,
      sequence: this.sequence,
      name: this.name,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      status: this.status,
    };
  }
}
