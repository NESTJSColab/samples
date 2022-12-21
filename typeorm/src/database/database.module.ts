import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions, createConnection } from 'typeorm';

import { Event, Idea, IdeaItem, IdeaItemType, Tag, User } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Idea, IdeaItem, IdeaItemType, Tag, User, Event]),
  ],
})
export class DatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        { provide: 'CONNECTION', useValue: createConnection(options) },
      ],
    };
  }
}
