import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTagDto, TagDtoInfo } from './dto';
import { Tag } from './models/tag.table';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectMapper('classes') private mapper: Mapper,
    private readonly repository: TagRepository,
  ) {}

  async getAll(): Promise<TagDtoInfo[]> {
    const dataDomain = await this.repository.getAll();

    return await this.mapper.mapArrayAsync(dataDomain, Tag, TagDtoInfo);
  }

  async create(tag: CreateTagDto): Promise<void> {
    const data = new Tag();
    data.id = uuidv4();
    data.key = tag.key;
    data.name = tag.name;
    data.status = 1;

    await this.repository.create(data);
  }
}
