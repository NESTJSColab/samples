import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTagDto, TagDtoInfo } from './application/dto';
import { TagService } from './tag.service';

@Controller('api/v1/tags')
export class TagsController {
  constructor(private tagService: TagService) {}

  @Get()
  async getAll(): Promise<TagDtoInfo[]> {
    return await this.tagService.getAll(1);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<TagDtoInfo> {
    return await this.tagService.getById(id);
  }

  @Get('getbykey/:key')
  async getByKey(@Param('key') key: string): Promise<TagDtoInfo[]> {
    return await this.tagService.getByKey(key);
  }

  @Post()
  async create(
    @Body() tag: CreateTagDto,
    @Headers() headers: Record<string, string>,
  ): Promise<void> {
    await this.tagService.create(tag, headers['trackId']);
  }

  @Put(':id')
  async enable(
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
  ): Promise<void> {
    return await this.tagService.enable(id, headers['trackId']);
  }

  @Put(':id')
  async disable(
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
  ): Promise<void> {
    return await this.tagService.disable(id, headers['trackId']);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
  ): Promise<void> {
    return await this.tagService.delete(id, headers['trackId']);
  }
}
