import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  ISharedReadRepository,
  SharedDatabaseException,
} from 'beyondnet.nestjssharedlib/dist/src';
import { Message } from './models/message.table';

@Injectable()
export class MessageReadRepository
  implements ISharedReadRepository<string, Message>
{
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
  ) {}

  async getAll(): Promise<Message[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }

  async getByUser(user: string): Promise<Message[]> {
    try {
      return await this.repository.find({
        where: { createdAt: user },
      });
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }

  async getById(id: string): Promise<Message> {
    try {
      const data = await this.repository.findOneBy({ id });

      if (!data) return;

      return data;
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }

  async getByProcess(process: string, user: string): Promise<Message[]> {
    try {
      return await this.repository.find({
        where: { process, createdAt: user },
      });
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }
}
