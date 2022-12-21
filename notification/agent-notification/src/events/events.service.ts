import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Message, MessageWriteRepository } from 'src/events/infrastructure';
import { CreateMessageDto } from 'src/events/application';

@Injectable()
export class EventsService {
  constructor(private repository: MessageWriteRepository) {}

  async insert(payload: CreateMessageDto): Promise<void> {
    const message = new Message();
    message.id = uuidv4();
    message.trackId = payload.trackId;
    message.process = payload.process;
    message.data = JSON.stringify(payload.data);
    message.createdAt = new Date().toISOString();
    message.createdBy = payload.createdBy;

    await this.repository.insert(message);
  }
}
