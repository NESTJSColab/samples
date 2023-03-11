import { DddAuditValueObject, DddEntity } from 'nestjscolab.ddd';

import { Id } from '../../../shared';
import { DatapassException } from './datapass.exception';
import { DatapassName } from './datapass.name';
import { DatapassSequence } from './datapass.sequence';

export interface IDatapassProps {
  sequence: DatapassSequence;
  name: DatapassName;
  clientId: Id;
  status: eDatapassStatus;
}

export enum eDatapassStatus {
  ACTIVE = 'ACTIVE',
  DELETE = 'DELETED',
}

export class Datapass extends DddEntity<IDatapassProps> {
  constructor(id: Id, props: IDatapassProps, audit: DddAuditValueObject) {
    super({
      id,
      props,
      audit,
    });
  }

  businessRules(): void {
    //* */
  }

  static create(props: IDatapassProps, createdBy: string) {
    const datapass = new Datapass(
      Id.generate(),
      props,
      DddAuditValueObject.create(createdBy, new Date()),
    );

    datapass.markAsNew(datapass);

    return datapass;
  }

  static load(data: any) {
    const { id, sequence, name, clientId, createdBy, createdAt, status } = data;

    const datapass = new Datapass(
      Id.setId(id),
      {
        sequence,
        clientId,
        name,
        status,
      },
      DddAuditValueObject.create(createdBy, createdAt),
    );

    datapass.marAsDirty(datapass);

    return datapass;
  }

  delete() {
    const props = this.getPropsCopy();

    if (props.status === eDatapassStatus.DELETE)
      throw new DatapassException('This datapass is already deleted');

    props.status = eDatapassStatus.DELETE;
    this.audit.update('beyondnet', new Date());
  }
}
