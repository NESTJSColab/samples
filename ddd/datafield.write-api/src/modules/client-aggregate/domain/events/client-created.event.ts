import { DomainEvent } from 'nestjscolab.ddd';
import { DatapassEventDto, TargetEventDto } from './common';

export class ClientCreatedDomainEvent extends DomainEvent {
  datapasses: DatapassEventDto[];
  targets: TargetEventDto[];

  constructor(
    readonly aggregateId: string,
    readonly id: string,
    readonly name: string,

    readonly createdAt: Date,
    readonly createdBy: string,
    readonly status: string,
  ) {
    super({
      eventName: ClientCreatedDomainEvent.name,
      aggregateId: id,
    });
  }

  toPlain() {
    return {
      aggregateId: this.aggregateId,
      id: this.id,
      name: this.name,
      datapasess: this.datapasses,
      targets: this.targets,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      status: this.status,
    };
  }
}
