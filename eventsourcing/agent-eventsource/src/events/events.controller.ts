import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageTagEventsPatterns } from 'src/common/constants';

import { EventDto } from './dto/event.dto';
import { EventsService } from './events.service';

@Controller('api/v1/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @MessagePattern(MessageTagEventsPatterns.CREATE)
  async create(@Payload() createEventDto: EventDto): Promise<void> {
    return await this.eventService.create(createEventDto);
  }
}
