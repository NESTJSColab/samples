import { DomainEvent } from 'nestjscolab.ddd';

export class ClientDatapassTargetRemovedDomainEvent extends DomainEvent {
  constructor(
    readonly clientId: string,
    readonly targetId: string,
    readonly datapassId: string,
  ) {
    super({
      eventName: ClientDatapassTargetRemovedDomainEvent.name,
      aggregateId: clientId,
    });
  }

  toPlain() {
    return {
      clientId: this.aggregateId,
      targetId: this.targetId,
      datapassId: this.datapassId,
    };
  }
}
