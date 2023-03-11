import { AggregateRoot, AuditValueObject } from 'nestjscolab.ddd';

import { getEnumKey, Id } from '../../../shared';
import { DatafieldSequence } from './datafield.sequence';
import { DataFieldException } from './datafield.exception';
import {
  DataFieldCreatedDomainEvent,
  DataFieldDeletedDomainEvent,
  DataFieldUnlockedDomainEvent,
  DataFieldLockedDomainEvent,
  DataFieldChangeFieldNameDomainEvent,
  ValidatorDeletedDomainEvent,
} from './events';
import { DatafieldTarget } from './datafield.target';
import { TargetEventDto, ValidatorEventDto } from './events/common';
import { DataFieldName } from './datafield.name';
import { DataFieldValidator } from './datafield.validator';
import { ValidatorAddedDomainEvent } from './events/validator-added.event';

export enum eDatafieldStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  DELETED = 'DELETED',
}

export interface IDataFieldProps {
  target: DatafieldTarget;
  sequence: DatafieldSequence;
  fieldName: DataFieldName;
  validators: DataFieldValidator[];
  status: eDatafieldStatus;
}

export class DataField extends AggregateRoot<IDataFieldProps, any> {
  constructor(id: Id, props: IDataFieldProps, audit: AuditValueObject) {
    super({
      id,
      props,
      audit,
    });

    if (this.getPropsTracking().isNew && !this.getPropsTracking().isDirty) {
      const { target, sequence, fieldName, validators, status } =
        this.getPropsCopy();

      const domainEvent = new DataFieldCreatedDomainEvent(
        this.getId(),
        new TargetEventDto(
          target.unpack().id,
          target.unpack().code,
          target.unpack().name,
        ),
        sequence.unpack(),
        fieldName.unpack(),
        this.audit.unpack().createdAt,
        this.audit.unpack().createdBy,
        status,
      );

      validators.forEach((v) => {
        domainEvent.validators.push(
          new ValidatorEventDto(
            v.unpack().id.unpack(),
            v.unpack().sequence,
            v.unpack().name,
          ),
        );
      });

      this.addEvent(domainEvent);
    }
  }

  static create(props: IDataFieldProps, createdBy: string) {
    const datafield = new DataField(
      Id.generate(),
      props,
      AuditValueObject.create(createdBy, new Date()),
    );

    datafield.markAsNew(datafield);

    return datafield;
  }

  static load(data: any) {
    const {
      id,
      target,
      sequence,
      fieldname,
      validators,
      status,
      createdBy,
      createdAt,
    } = data;

    const dataField = new DataField(
      Id.setId(id),
      {
        target: DatafieldTarget.create(target.id, target.code, target.name),
        sequence: DatafieldSequence.create(sequence),
        fieldName: DataFieldName.create(fieldname),
        validators: [],
        status: getEnumKey(status, eDatafieldStatus),
      },
      AuditValueObject.create(createdBy, createdAt),
    );

    const tmpValidators: DataFieldValidator[] = [];

    validators.forEach((v) => {
      tmpValidators.push(
        DataFieldValidator.create({
          id: Id.setId(v.id),
          sequence,
          name: v.name,
        }),
      );
    });

    dataField.getProps().validators = tmpValidators;
    dataField.audit = AuditValueObject.create(createdBy, createdAt);

    dataField.marAsDirty(dataField);
    dataField.clearEvents();

    return dataField;
  }

  changeFieldName(newName: string, createdBy: string) {
    this.getProps().fieldName = DataFieldName.create(newName);
    this.audit.update(createdBy, new Date());

    this.addEvent(
      new DataFieldChangeFieldNameDomainEvent(
        this.getId(),
        this.getPropsCopy().fieldName.unpack(),
        newName,
      ),
    );
  }

  lock(createdBy: string) {
    const props = this.getPropsCopy();
    if (
      props.status === eDatafieldStatus.DELETED ||
      props.status === eDatafieldStatus.LOCKED
    )
      throw new DataFieldException(
        `DataField cannot be lock due the status is:${props.status}`,
      );

    props.status = eDatafieldStatus.LOCKED;
    this.audit.update(createdBy, new Date());

    this.addEvent(
      new DataFieldLockedDomainEvent(this.getId(), this.getPropsCopy().status),
    );
  }

  unlock(createdBy: string) {
    const props = this.getPropsCopy();
    if (
      props.status === eDatafieldStatus.DELETED ||
      props.status === eDatafieldStatus.ACTIVE
    )
      throw new DataFieldException(
        `DataField cannot be unlock due the status is:${props.status}`,
      );

    this.getPropsCopy().status = eDatafieldStatus.ACTIVE;
    this.audit.update(createdBy, new Date());

    this.addEvent(
      new DataFieldUnlockedDomainEvent(
        this.getId(),
        this.getPropsCopy().status,
      ),
    );
  }

  delete(createdBy: string) {
    const props = this.getPropsCopy();

    if (props.status === eDatafieldStatus.DELETED)
      throw new DataFieldException('This datafield is already deleted');

    props.status = eDatafieldStatus.DELETED;
    this.audit.update(createdBy, new Date());

    this.addEvent(new DataFieldDeletedDomainEvent(this.getId()));
  }

  businessRules(): void {
    //* */
  }

  addValidator(validator: DataFieldValidator, createdBy: string) {
    const item = this.getPropsCopy().validators.find(
      (v) => v.unpack().id.unpack() === validator.unpack().id.unpack(),
    );

    if (item) throw new DataFieldException('Validator already exists');

    this.getProps().validators.push(validator);

    this.audit.update(createdBy);

    this.addEvent(
      new ValidatorAddedDomainEvent(
        validator.unpack().id.unpack(),
        validator.unpack().name,
      ),
    );
  }

  removeValidator(validator: DataFieldValidator, createdBy: string) {
    const index = this.getPropsCopy().validators.findIndex(
      (v) => v.unpack().id.unpack() === validator.unpack().id.unpack(),
    );

    if (index === 0) throw new DataFieldException('Validator does not exists');

    this.getProps().validators.splice(index, 1);

    this.audit.update(createdBy);

    this.addEvent(
      new ValidatorDeletedDomainEvent(validator.unpack().id.unpack()),
    );
  }
}
