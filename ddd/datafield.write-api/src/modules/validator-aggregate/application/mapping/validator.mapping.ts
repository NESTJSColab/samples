import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';

import { eValidatorStatus, Validator } from '../../domain';
import { ValidatorTable } from '../../../../database';
import { getEnumKeyAsString } from '../../../../shared';

@Injectable()
export class ValidatorProfileMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Validator,
        ValidatorTable,
        forMember(
          (d) => d.id,
          mapFrom((s) => s.getId()),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.getPropsCopy().name.unpack()),
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
            getEnumKeyAsString(s.getPropsCopy().status, eValidatorStatus),
          ),
        ),
      );
    };
  }
}
