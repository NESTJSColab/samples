import { DddAggregateRoot, DddAuditValueObject } from 'nestjscolab.ddd';

import {
  ClientException,
  ClientName,
  Datapass,
  DatapassName,
  DatapassSequence,
  eDatapassStatus,
  TargetCode,
  TargetName,
  eTargetStatus,
  Target,
  ClientCreatedDomainEvent,
  ClientDeletedDomainEvent,
  ClientTargetAddedDomainEvent,
  ClientTargetDeletedDomainEvent,
  ClientDatapassAddedDomainEvent,
  ClientDatapassDeletedDomainEvent,
  ClientDatapassTargetAddedDomainEvent,
  ClientDatapassTargetRemovedDomainEvent,
} from './';
import { getEnumKey, Id } from '../../../shared';
import { DatapassEventDto, TargetEventDto } from './events/common';

export interface IClientProps {
  name: ClientName;
  targets: Target[];
  datapasses: Datapass[];
  status: eClientStatus;
}

export enum eClientStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export class Client extends DddAggregateRoot<IClientProps> {
  constructor(id: Id, props: IClientProps, audit: DddAuditValueObject) {
    super({ id, props, audit });

    if (this.getPropsTracking().isNew && !this.getPropsTracking().isDirty) {
      const { name, datapasses, targets, status } = this.getPropsCopy();

      const domainEvent = new ClientCreatedDomainEvent(
        this.getId(),
        this.getId(),
        name.unpack(),
        this.audit.unpack().createdAt,
        this.audit.unpack().createdBy,
        status,
      );

      datapasses.forEach((d) => {
        const { sequence, name } = d.getPropsCopy();
        domainEvent.datapasses.push(
          new DatapassEventDto(d.getId(), sequence.unpack(), name.unpack()),
        );
      });

      targets.forEach((t) => {
        const { code, name } = t.getPropsCopy();
        domainEvent.targets.push(
          new TargetEventDto(t.getId(), code.unpack(), name.unpack()),
        );
      });

      this.addEvent(domainEvent);
    }
  }

  businessRules(): void {
    //
  }

  static create(props: IClientProps, createdBy: string) {
    const client = new Client(
      Id.generate(),
      props,
      AuditValueObject.create(createdBy, new Date()),
    );

    client.getProps().status = eClientStatus.ACTIVE;

    client.markAsNew(client);

    return client;
  }

  static load(data: any): Client {
    const { id, name, datapasses, targets, createdBy, createdAt, status } =
      data;

    const client = new Client(
      Id.setId(id),
      {
        name: ClientName.create(name),
        datapasses: [],
        targets: [],
        status: getEnumKey(status, eClientStatus),
      },
      AuditValueObject.create(createdBy, createdAt),
    );

    const tmpDatapass: Datapass[] = [];

    datapasses.forEach((d) => {
      tmpDatapass.push(
        Datapass.load({
          id: d.id,
          sequence: d.sequence,
          name: d.name,
          createdBy: d.createdBy,
          createdAt: d.createdAt,
          status: d.status,
        }),
      );
    });

    client.getProps().datapasses = tmpDatapass;

    const tmpTargets: Target[] = [];

    targets.forEach((d) => {
      tmpTargets.push(
        Target.load({
          id: d.id,
          code: d.code,
          name: d.name,
          datapasses: [],
          createdBy: d.createdBy,
          createdAt: d.createdAt,
          status: d.status,
        }),
      );
    });

    client.getProps().targets = targets;

    client.marAsDirty(client);

    client.clearEvents();

    return client;
  }

  delete(createdBy: string) {
    const props = this.getPropsCopy();

    if (props.targets)
      throw new ClientException(
        'The client has Targets assigned. You should remove them before removing the client',
      );

    if (props.datapasses)
      throw new ClientException(
        'The client has Datapasses assigned. You should remove them before removing the client',
      );

    if (props.status === eClientStatus.DELETED)
      throw new ClientException('This client is already deleted');

    props.status = eClientStatus.DELETED;

    this.audit.update(createdBy, new Date());

    this.addEvent(new ClientDeletedDomainEvent(this.getId(), this.getId()));
  }

  addTarget(clientId: Id, name: TargetName, createdBy: string): Target {
    const target = Target.create(
      {
        code: TargetCode.create(TargetCode.generate().unpack()),
        name,
        clientId,
        datapasses: [],
        status: eTargetStatus.ACTIVE,
      },
      createdBy,
    );

    if (this.getPropsCopy().targets?.includes(target))
      throw new ClientException('Target already exists');

    this.getProps().targets.push(target);

    this.audit.update(createdBy, new Date());

    const props = target.getPropsCopy();

    this.addEvent(
      new ClientTargetAddedDomainEvent(
        this.getId(),
        target.getId(),
        props.code.unpack(),
        props.name.unpack(),
        target.audit.unpack().createdAt,
        target.audit.unpack().createdBy,
        props.status,
      ),
    );

    return target;
  }

  removeTarget(targetId: Id, createdBy: string) {
    const target = this.getPropsCopy().targets?.find(
      (t) => t.getId() === targetId.unpack(),
    );

    if (!target) throw new ClientException('Target does not exists');

    target.delete();

    delete this.getProps().targets[
      this.getPropsCopy().targets.findIndex((item) => {
        item.getId() === target.getId();
      })
    ];

    this.audit.update(createdBy, new Date());

    this.addEvent(
      new ClientTargetDeletedDomainEvent(this.getId(), target.getId()),
    );
  }

  addDatapass(
    clientId: Id,
    sequence: DatapassSequence,
    name: DatapassName,
    createdBy: string,
  ): Datapass {
    const datapass = Datapass.create(
      { sequence, name, clientId, status: eDatapassStatus.ACTIVE },
      createdBy,
    );

    if (this.getPropsCopy().datapasses?.includes(datapass))
      throw new ClientException('Datapass already exists');

    this.getProps().datapasses.push(datapass);

    this.audit.update(createdBy, new Date());

    const props = datapass.getPropsCopy();

    this.addEvent(
      new ClientDatapassAddedDomainEvent(
        this.getId(),
        datapass.getId(),
        props.sequence.unpack(),
        props.name.unpack(),
        datapass.audit.unpack().createdAt,
        datapass.audit.unpack().createdBy,
        props.status,
      ),
    );

    return datapass;
  }

  removeDatapass(datapassId: Id, createdBy: string) {
    const datapass = this.getProps().datapasses?.find(
      (d) => d.getId() === datapassId.unpack(),
    );

    if (!datapass) throw new ClientException('Datapass does not exists');

    datapass.delete();

    delete this.getProps().targets[
      this.getPropsCopy().targets.findIndex((item) => {
        item.getId() === datapass.getId();
      })
    ];

    this.audit.update(createdBy, new Date());

    this.addEvent(
      new ClientDatapassDeletedDomainEvent(this.getId(), datapass.getId()),
    );
  }

  AssignDatapassToTarget(
    targetId: string,
    datapass: Datapass,
    createdBy: string,
  ): Target {
    const target = this.getProps().targets.find((t) => t.getId() === targetId);

    target.addDatapass(datapass, createdBy);

    const { sequence, name } = datapass.getPropsCopy();

    this.addEvent(
      new ClientDatapassTargetAddedDomainEvent(
        this.getId(),
        targetId,
        datapass.getId(),
        sequence.unpack(),
        name.unpack(),
        new Date(),
        createdBy,
      ),
    );

    this.audit.update(createdBy);

    return target;
  }

  removeDatapassFromTarget(
    targetId: string,
    datapass: Datapass,
    createdBy: string,
  ): Target {
    const target = this.getProps().targets.find((t) => t.getId() === targetId);

    target.removeDatapass(datapass, createdBy);

    this.addEvent(
      new ClientDatapassTargetRemovedDomainEvent(
        this.getId(),
        targetId,
        datapass.getId(),
      ),
    );

    return target;
  }
}
