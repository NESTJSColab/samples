import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TagDomain } from 'src/tag/domain';
import { TagRepository } from 'src/tag/infrastructure/database';
import { TagDtoInfo } from '../../dto';
import { GetTagByKeyQuery } from '../get-tagbykey.query';

@QueryHandler(GetTagByKeyQuery)
export class GetTagByKeyQueryHandler implements IQueryHandler<GetTagByKeyQuery> {

  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper) { }

  async execute(query: GetTagByKeyQuery): Promise<TagDtoInfo[]> {

    const dataDomain = await this.tagRepository.getByKey(query.key);

    return await this.mapper.mapArrayAsync(dataDomain, TagDomain, TagDtoInfo);
  }
}