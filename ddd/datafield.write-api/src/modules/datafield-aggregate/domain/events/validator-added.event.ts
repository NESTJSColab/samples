import { DomainEvent } from 'nestjscolab.ddd';

export class ValidatorAddedDomainEvent extends DomainEvent {
  constructor(readonly id: string, readonly name: string) {
    super({
      eventName: ValidatorAddedDomainEvent.name,
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
