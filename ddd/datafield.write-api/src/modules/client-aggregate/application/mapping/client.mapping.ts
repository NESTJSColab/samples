import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';

import { ClientTable, DatapassTable, TargetTable } from '../../../../database';
import { getEnumKeyAsString } from '../../../../shared/helpers';
import {
  Client,
  eClientStatus,
  Datapass,
  eDatapassStatus,
  Target,
  eTargetStatus,
} from '../../domain';

@Injectable()
export class ClientProfileMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Target,
        TargetTable,
        forMember(
          (d) => d.id,
          mapFrom((s) => s.getId()),
        ),
        forMember(
          (d) => d.code,
          mapFrom((s) => s.getPropsCopy().code.unpack()),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.getPropsCopy().name.unpack()),
        ),
        forMember(
          (d) => d.client.id,
          mapFrom((s) => s.getPropsCopy().clientId.unpack()),
        ),
        forMember(
          (d) => d.createdBy,
          mapFrom((s) => s.audit.unpack().createdBy),
        ),
        forMember(
          (d) => d.createdAt,
          mapFrom((s) => s.audit.unpack().createdAt),
        ),
        forMember(
          (d) => d.updatedBy,
          mapFrom((s) => s.audit.unpack().updatedBy),
        ),
        forMember(
          (d) => d.updatedAt,
          mapFrom((s) => s.audit.unpack().updatedAt),
        ),
        forMember(
          (d) => d.status,
          mapFrom((s) =>
            getEnumKeyAsString(s.getPropsCopy().status, eTargetStatus),
          ),
        ),
      );
      createMap(
        mapper,
        Datapass,
        DatapassTable,
        forMember(
          (d) => d.id,
          mapFrom((s) => s.getId()),
        ),
        forMember(
          (d) => d.sequence,
          mapFrom((s) => s.getPropsCopy().sequence.unpack()),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.getPropsCopy().name.unpack()),
        ),
        forMember(
          (d) => d.client.id,
          mapFrom((s) => s.getPropsCopy().clientId.unpack()),
        ),
        forMember(
          (d) => d.createdBy,
          mapFrom((s) => s.audit.unpack().createdBy),
        ),
        forMember(
          (d) => d.createdAt,
          mapFrom((s) => s.audit.unpack().createdAt),
        ),
        forMember(
          (d) => d.updatedBy,
          mapFrom((s) => s.audit.unpack().updatedBy),
        ),
        forMember(
          (d) => d.updatedAt,
          mapFrom((s) => s.audit.unpack().updatedAt),
        ),
        forMember(
          (d) => d.status,
          mapFrom((s) =>
            getEnumKeyAsString(s.getPropsCopy().status, eDatapassStatus),
          ),
        ),
      );
      createMap(
        mapper,
        Client,
        ClientTable,
        forMember(
          (d) => d.id,
          mapFrom((s) => s.getId()),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.getPropsCopy().name.unpack()),
        ),
        forMember(
          (d) => d.targets,
          mapFrom((s) =>
            s
              .getPropsCopy()
              .targets.map((t) => mapper.map(t, Target, TargetTable)),
          ),
        ),
        forMember(
          (d) => d.datapasses,
          mapFrom((s) =>
            s
              .getPropsCopy()
              .datapasses.map((t) => mapper.map(t, Datapass, DatapassTable)),
          ),
        ),
        forMember(
          (d) => d.createdBy,
          mapFrom((s) => s.audit.unpack().createdBy),
        ),
        forMember(
          (d) => d.createdAt,
          mapFrom((s) => s.audit.unpack().createdAt),
        ),
        forMember(
          (d) => d.updatedBy,
          mapFrom((s) => s.audit.unpack().updatedBy),
        ),
        forMember(
          (d) => d.updatedAt,
          mapFrom((s) => s.audit.unpack().updatedAt),
        ),
        forMember(
          (d) => d.status,
          mapFrom((s) =>
            getEnumKeyAsString(s.getPropsCopy().status, eClientStatus),
          ),
        ),
      );
    };
  }
}
