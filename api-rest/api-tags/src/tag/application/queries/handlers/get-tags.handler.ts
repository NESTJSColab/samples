import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TagDomain } from 'src/tag/domain';
import { TagRepository } from 'src/tag/infrastructure/database';
import { TagDtoInfo } from '../../dto';
import { GetTagsQuery } from '../get-tags.query';

@QueryHandler(GetTagsQuery)
export class GetTagsQueryHandler implements IQueryHandler<GetTagsQuery> {

  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper) { }

  async execute(query: GetTagsQuery): Promise<TagDtoInfo[]> {

    const dataDomain = await this.tagRepository.getAll();

    return await this.mapper.mapArrayAsync(dataDomain, TagDomain, TagDtoInfo);
  }
}