import { DomainEvent } from 'nestjscolab.ddd';

export class ValidatorDeletedDomainEvent extends DomainEvent {
  constructor(readonly id: string) {
    super({ eventName: ValidatorDeletedDomainEvent.name, aggregateId: id });
  }

  toPlain() {
    return {
      id: this.id,
    };
  }
}
