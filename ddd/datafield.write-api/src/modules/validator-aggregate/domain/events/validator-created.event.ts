import { DomainEvent } from 'nestjscolab.ddd';

export class ValidatorCreatedDomainEvent extends DomainEvent {
  constructor(readonly id: string, readonly name: string) {
    super({
      eventName: ValidatorCreatedDomainEvent.name,
      aggregateId: id,
    });
  }

  toPlain() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
