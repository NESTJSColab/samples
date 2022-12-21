import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/events/infrastructure/database/models/message.table';

import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { MessageWriteRepository } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageWriteRepository, EventsGateway, EventsService],
})
export class EventsModule {}
