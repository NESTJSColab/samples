import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { PaginationQueryDto } from 'src/shared/dto';
import { CreateIdeaDto, IdeaDto, UpdateIdeaDto } from './dto';
import { IdeaService } from './idea.service';

@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  async GetAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<IdeaDto[]> {
    return await this.ideaService.GetAll(paginationQuery);
  }

  @Get(':id')
  async FindById(@Param('id') id: string): Promise<IdeaDto> {
    return await this.ideaService.GetById(id);
  }

  @Post()
  async Create(@Body() createDto: CreateIdeaDto): Promise<IdeaDto> {
    return await this.ideaService.Create(createDto);
  }

  @Patch(':id')
  async Cancel(@Param('id') id: string): Promise<IdeaDto> {
    return null;
  }

  @Patch(':id')
  async Update(
    @Param('id') id: string,
    @Body() updateDto: UpdateIdeaDto,
  ): Promise<IdeaDto> {
    return null;
  }

  @Delete(':id')
  async Delete(@Param('id') id: string): Promise<IdeaDto> {
    return null;
  }
}
