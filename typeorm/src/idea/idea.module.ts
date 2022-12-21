import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { IdeaProfile, TagProfile } from './mappers';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { Event, Idea, Tag, User } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Idea, Tag, User, Event]),
    UserModule,
    DatabaseModule,
    SharedModule,
  ],
  controllers: [IdeaController],
  providers: [IdeaProfile, TagProfile, IdeaService],
})
export class IdeaModule {}
