import { DomainEvent } from 'nestjscolab.ddd';
import { TargetEventDto, ValidatorEventDto } from './common';

export class DataFieldCreatedDomainEvent extends DomainEvent {
  validators: ValidatorEventDto[];

  constructor(
    readonly id: string,
    readonly target: TargetEventDto,
    readonly sequence: number,
    readonly fieldName: string,
    readonly createdAt: Date,
    readonly createdBy: string,
    readonly status: string,
  ) {
    super({
      eventName: DataFieldCreatedDomainEvent.name,
      aggregateId: id,
    });
  }

  toPlain() {
    return {
      id: this.id,
      sequence: this.sequence,
      target: this.target,
      fieldName: this.fieldName,
      validators: this.validators,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      status: this.status,
    };
  }
}
