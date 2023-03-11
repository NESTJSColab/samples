import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';

import { DataField, eDatafieldStatus } from '../../domain';
import { DataFieldTable, ValidatorTable } from '../../../../database';
import { getEnumKeyAsString } from '../../../../shared';
import { DataFieldValidator } from '../../domain/datafield.validator';

@Injectable()
export class DataFieldProfileMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        DataFieldValidator,
        ValidatorTable,
        forMember(
          (d) => d.id,
          mapFrom((s) => s.unpack().id.unpack()),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.unpack().name),
        ),
      ),
        createMap(
          mapper,
          DataField,
          DataFieldTable,
          forMember(
            (d) => d.id,
            mapFrom((s) => s.getId()),
          ),
          forMember(
            (d) => d.validators,
            mapFrom((s) =>
              s
                .getPropsCopy()
                .validators.map((t) =>
                  mapper.map(t, DataFieldValidator, ValidatorTable),
                ),
            ),
          ),
          forMember(
            (d) => d.fieldname,
            mapFrom((s) => s.getPropsCopy().fieldName.unpack()),
          ),
          forMember(
            (d) => d.sequence,
            mapFrom((s) => s.getPropsCopy().sequence.unpack()),
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
              getEnumKeyAsString(s.getPropsCopy().status, eDatafieldStatus),
            ),
          ),
        );
    };
  }
}
