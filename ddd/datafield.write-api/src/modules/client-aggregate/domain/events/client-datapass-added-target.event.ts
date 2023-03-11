import { DomainEvent } from 'nestjscolab.ddd';

export class ClientDatapassTargetAddedDomainEvent extends DomainEvent {
  constructor(
    readonly clientId: string,
    readonly targetId: string,
    readonly datapassId: string,
    readonly sequence: number,
    readonly name: string,
    readonly createdAt: Date,
    readonly createdBy: string,
  ) {
    super({
      eventName: ClientDatapassTargetAddedDomainEvent.name,
      aggregateId: clientId,
    });
  }

  toPlain() {
    return {
      clientId: this.aggregateId,
      targetId: this.targetId,
      datapassId: this.datapassId,
      sequence: this.sequence,
      name: this.name,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
    };
  }
}
