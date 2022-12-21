import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CreateTagDto, TagDtoInfo } from './application/dto';
import {
  GetTagByIdQuery,
  GetTagByKeyQuery,
  GetTagsQuery,
} from './application/queries';
import {
  CreateTagCommand,
  DisableTagCommand,
  EnableTagCommand,
} from './application/commands';
import { DeleteTagCommand } from './application/commands/delete-tag.command';

@Injectable()
export class TagService {
  constructor(
    @InjectMapper('classes') private mapper: Mapper,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getAll(status: number): Promise<TagDtoInfo[]> {
    return await this.queryBus.execute(new GetTagsQuery(status));
  }

  async getById(id: string): Promise<TagDtoInfo> {
    return await this.queryBus.execute(new GetTagByIdQuery(id));
  }

  async getByKey(key: string): Promise<TagDtoInfo[]> {
    return await this.queryBus.execute(new GetTagByKeyQuery(key));
  }

  async create(tag: CreateTagDto, trackId: string): Promise<void> {
    const command = await this.mapper.mapAsync(
      tag,
      CreateTagDto,
      CreateTagCommand,
    );

    command.trackId = trackId;

    await this.commandBus.execute(command);
  }

  async enable(id: string, trackId: string): Promise<void> {
    return await this.commandBus.execute(
      (new EnableTagCommand(id).trackId = trackId),
    );
  }

  async disable(id: string, trackId: string): Promise<void> {
    return await this.commandBus.execute(
      (new DisableTagCommand(id).trackId = trackId),
    );
  }

  async delete(id: string, trackId: string): Promise<void> {
    return await this.commandBus.execute(
      (new DeleteTagCommand(id).trackId = trackId),
    );
  }
}
