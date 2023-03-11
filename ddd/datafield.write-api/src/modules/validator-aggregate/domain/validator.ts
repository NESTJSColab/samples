import { AggregateRoot, AuditValueObject } from 'nestjscolab.ddd';

import { getEnumKey, Id } from '../../../shared';
import { ValidatorException } from './validator.exception';
import { ValidatorName } from './validator.name';
import { ValidatorCreatedDomainEvent } from './events/validator-created.event';
import { ValidatorDeletedDomainEvent } from './events/validator-deleted.event';

export interface IValidatorProps {
  name: ValidatorName;
  status: eValidatorStatus;
}

export enum eValidatorStatus {
  ACTIVE = 'ACTIVE',
  DELETE = 'DELETED',
}

export class Validator extends AggregateRoot<IValidatorProps> {
  constructor(id: Id, props: IValidatorProps, audit: AuditValueObject) {
    super({
      id,
      props,
      audit,
    });

    if (this.getPropsTracking().isNew && !this.getPropsTracking().isDirty) {
      const { name } = this.getPropsCopy();

      this.addEvent(
        new ValidatorCreatedDomainEvent(this.getId(), name.unpack()),
      );
    }
  }

  businessRules(): void {
    /**/
  }

  static create(props: IValidatorProps, createdBy: string) {
    return new Validator(
      Id.generate(),
      props,
      AuditValueObject.create(createdBy),
    );
  }

  static load(data: any) {
    const { id, name, createdBy, createdAt, status } = data;

    const target = new Validator(
      Id.setId(id),
      {
        name: ValidatorName.create(name),
        status: getEnumKey(status, eValidatorStatus),
      },
      AuditValueObject.create(createdBy, createdAt),
    );

    target.audit = AuditValueObject.create(createdBy, createdAt);
    target.marAsDirty(target);

    return target;
  }

  delete(createdBy: string) {
    const props = this.getPropsCopy();

    if (props.status === eValidatorStatus.DELETE)
      throw new ValidatorException('This validator is already deleted');

    this.getProps().status = eValidatorStatus.DELETE;

    this.addEvent(new ValidatorDeletedDomainEvent(this.getId()));

    this.audit.update(createdBy);
  }
}
