import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TagRepository } from 'src/tag/infrastructure/database';
import { TagDtoInfo } from '../../dto';
import { GetTagByIdQuery } from '../get-tagbyid.query';
import { TagDomain } from 'src/tag/domain';

@QueryHandler(GetTagByIdQuery)
export class GetTagByIdQueryHandler implements IQueryHandler<GetTagByIdQuery> {

  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper) { }

  async execute(query: GetTagByIdQuery): Promise<TagDtoInfo> {

    const dataDomain = await this.tagRepository.getById(query.id);

    return await this.mapper.mapAsync(dataDomain, TagDomain, TagDtoInfo);
  }
}