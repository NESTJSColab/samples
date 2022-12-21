import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  ISharedWriteRepository,
  SharedDatabaseException,
} from 'beyondnet.nestjssharedlib/dist/src';
import { Message } from './models/message.table';

@Injectable()
export class MessageWriteRepository
  implements ISharedWriteRepository<string, Message>
{
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
  ) {}

  async insert(model: Message): Promise<void> {
    try {
      await this.repository.insert(model);
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }

  async update(id: string, data: Message): Promise<void> {
    try {
      await this.repository.update(id, data);
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete({ id });
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }
}
