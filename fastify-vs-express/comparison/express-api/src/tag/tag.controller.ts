import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagDto, TagDtoInfo } from './dto';
import { Tag } from './models/tag.table';

import { TagService } from './tag.service';

@Controller('api/v1/tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private tagService: TagService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Tag,
  })
  async getAll(): Promise<TagDtoInfo[]> {
    return await this.tagService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create Tag' })
  async create(@Body() tag: CreateTagDto): Promise<void> {
    await this.tagService.create(tag);
  }
}
