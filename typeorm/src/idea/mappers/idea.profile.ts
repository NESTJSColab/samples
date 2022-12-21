import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { mapFrom } from '@automapper/core';

import { IdeaDto, IdeaItemDto } from '../dto';
import { IdeaItem, Idea } from 'src/database/entities';

@Injectable()
export class IdeaProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(Idea, IdeaDto).forMember(
        (destination) => destination.tags,
        mapFrom((source) => source.tags.map((t) => t.name)),
      );
      mapper.createMap(IdeaDto, Idea);
      mapper.createMap(IdeaItemDto, IdeaItem);
      mapper.createMap(IdeaItem, IdeaItemDto);
    };
  }
}
