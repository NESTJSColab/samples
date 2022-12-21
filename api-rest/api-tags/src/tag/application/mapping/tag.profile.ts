import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { CreateTagCommand } from 'src/tag/application/commands';
import { TagDomain } from 'src/tag/domain';
import { TagModel } from 'src/tag/infrastructure/database/models';
import { CreateTagDto, TagDtoInfo } from '../dto';
import { Id } from 'src/tag/domain/id.domain';
import { Key } from 'src/tag/domain/key.domain';
import { Name } from 'src/tag/domain/name.domain';
import { TagStatus } from 'src/tag/domain/tag.domain';

@Injectable()
export class TagsProfile extends AutomapperProfile {
  constructor(@InjectMapper('classes') mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        TagModel,
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
        forMember(
          (d) => d.status,
          mapFrom((s) => GetStatusName(s.status)),
        ),
      );
      createMap(
        mapper,
        TagDomain,
        TagDtoInfo,
        forMember(
          (d) => new Id(d.id),
          mapFrom((s) => s.id),
        ),
        forMember(
          (d) => new Key(d.key),
          mapFrom((s) => s.key),
        ),
        forMember(
          (d) => new Name(d.name),
          mapFrom((s) => s.name),
        ),
        forMember(
          (d) => d.status,
          mapFrom((s) => GetStatusName(s.status)),
        ),
      );
      createMap(
        mapper,
        CreateTagDto,
        TagModel,
        forMember(
          (d) => d.key,
          mapFrom((s) => s.key),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.name),
        ),
      );
      createMap(
        mapper,
        CreateTagDto,
        CreateTagCommand,
        forMember(
          (d) => d.key,
          mapFrom((s) => s.key),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.name),
        ),
      );

      createMap(
        mapper,
        TagDomain,
        TagModel,
        forMember(
          (d) => new Id(d.id),
          mapFrom((s) => s.id),
        ),
        forMember(
          (d) => new Key(d.key),
          mapFrom((s) => s.key),
        ),
        forMember(
          (d) => new Name(d.name),
          mapFrom((s) => s.name),
        ),
      );
      createMap(
        mapper,
        TagModel,
        TagDomain,
        forMember(
          (d) => d.id,
          mapFrom((s) => new Id(s.id)),
        ),
        forMember(
          (d) => d.key,
          mapFrom((s) => new Key(s.key)),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => new Name(s.name)),
        ),
      );
    };
  }
}

const GetStatusName = (value: TagStatus): string => {
  switch (value) {
    case TagStatus.Inactive:
      return 'Inactive';
      break;
    default:
      return 'Active';
      break;
  }
};
