import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Tag } from '../models/tag.table';
import { TagDtoInfo } from '../dto';

@Injectable()
export class TagsProfile extends AutomapperProfile {
  constructor(@InjectMapper('classes') mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Tag,
        TagDtoInfo,
        forMember(
          (d) => d.id,
          mapFrom((s) => s.id),
        ),
        forMember(
          (d) => d.key,
          mapFrom((s) => s.key),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.name),
        ),
      );
    };
  }
}
