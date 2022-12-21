import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Tag } from './models/tag.table';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(Tag)
    private repository: Repository<Tag>,
  ) {}

  async getAll(): Promise<Tag[]> {
    try {
      return this.repository.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(model: Tag): Promise<void> {
    try {
      await this.repository.save(model);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
