import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsSagas } from './infrastructure/sagas';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './domain/domainevents/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { TagsProfile } from './application/mapping';
import { TagModel } from 'src/tag/infrastructure/database/models';
import { TagRepository } from './infrastructure/database';
import { TagsController } from './tags.controllers';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagModel]), CqrsModule],
  controllers: [TagsController],
  providers: [
    TagService,
    TagsProfile,
    TagsSagas,
    TagRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers],
})
export class TagModule { }
