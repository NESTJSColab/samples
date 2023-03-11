import { DddAuditValueObject, DddEntity } from 'nestjscolab.ddd';

import { TargetName } from './target.name';
import { TargetCode } from './target.code';

import { TargetException } from './target.exception';
import { Id, getEnumKey } from '../../../shared';
import { Datapass } from './datapass';

export interface ITargetProps {
  code: TargetCode;
  name: TargetName;
  clientId: Id;
  datapasses: Datapass[];
  status: eTargetStatus;
}

export enum eTargetStatus {
  ACTIVE = 'ACTIVE',
  DELETE = 'DELETED',
}

export class Target extends DddEntity<ITargetProps> {
  constructor(id: Id, props: ITargetProps, audit: DddAuditValueObject) {
    super({
      id,
      props,
      audit,
    });
  }

  businessRules(): void {
    //* */
  }

  static create(props: ITargetProps, createdBy: string) {
    const target = new Target(
      Id.generate(),
      props,
      DddAuditValueObject.create(createdBy, new Date()),
    );

    target.markAsNew(target);

    return target;
  }

  static load(data: any): Target {
    const {
      id,
      code,
      name,
      clientId,
      datapasses,
      createdBy,
      createdAt,
      status,
    } = data;

    const target = new Target(
      Id.setId(id),
      {
        code: TargetCode.create(code),
        name: TargetName.create(name),
        clientId,
        datapasses: [],
        status: getEnumKey(status, eTargetStatus),
      },
      DddAuditValueObject.create(createdBy, createdAt),
    );

    const tmpTargetDatapasses: Datapass[] = [];

    datapasses.forEach((d) => {
      tmpTargetDatapasses.push(d);
    });

    target.marAsDirty(target);

    return target;
  }

  delete() {
    const props = this.getPropsCopy();

    if (props.status === eTargetStatus.DELETE)
      throw new TargetException('This target is already deleted');

    props.status = eTargetStatus.DELETE;

    this.audit.update('beyondnet', new Date());
  }

  addDatapass(datapass: Datapass, createdBy: string) {
    if (this.getPropsCopy().datapasses.includes(datapass))
      throw new TargetException('Datapass already exists');

    this.getProps().datapasses.push(datapass);

    this.audit.update(createdBy, new Date());
  }

  removeDatapass(datapass: Datapass, createdBy: string) {
    if (!this.getPropsCopy().datapasses.includes(datapass))
      throw new TargetException('Datapass does not exists');

    const index = this.getProps().datapasses.indexOf(datapass);
    this.getProps().datapasses.splice(index, 1);

    this.audit.update(createdBy, new Date());
  }
}
