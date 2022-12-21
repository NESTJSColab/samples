import { Injectable } from '@nestjs/common';

import { EventRepository } from './database';
import { Event } from './database/tables';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly repository: EventRepository) {}

  async create(entity: EventDto): Promise<void> {
    const table = new Event();
    table.id = entity.id;
    table.aggregateId = entity.aggregateId;
    table.eventType = entity.eventType;
    table.eventName = entity.eventName;
    table.data = entity.data;
    table.createdAt = entity.createdAt;
    table.createdBy = entity.createdBy;

    await this.repository.insert(table);
  }
}
