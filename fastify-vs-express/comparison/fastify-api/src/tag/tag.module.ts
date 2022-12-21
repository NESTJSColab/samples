import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsProfile } from './mapping';
import { Tag } from './models/tag.table';
import { TagsController } from './tag.controller';
import { TagRepository } from './tag.repository';

import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagRepository, TagService, TagsProfile],
  controllers: [TagsController],
})
export class TagModule {}
