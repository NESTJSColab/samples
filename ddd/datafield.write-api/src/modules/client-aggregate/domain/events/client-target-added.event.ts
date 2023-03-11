import { DomainEvent } from 'nestjscolab.ddd';

export class ClientTargetAddedDomainEvent extends DomainEvent {
  constructor(
    readonly clientId: string,
    readonly id: string,
    readonly code: string,
    readonly name: string,
    readonly createdAt: Date,
    readonly createdBy: string,
    readonly status: string,
  ) {
    super({
      eventName: ClientTargetAddedDomainEvent.name,
      aggregateId: clientId,
    });
  }

  toPlain() {
    return {
      clientId: this.aggregateId,
      id: this.id,
      code: this.code,
      name: this.name,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      status: this.status,
    };
  }
}
