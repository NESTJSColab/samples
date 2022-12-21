import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IRepository } from 'src/common/repository';
import { Tag } from './models';
import { TagStatus } from './models/tag.table';
import { SharedDatabaseException } from 'beyondnet.nestjssharedlib/dist/src';

@Injectable()
export class TagRepository implements IRepository<Tag> {
  constructor(
    @InjectRepository(Tag)
    private repository: Repository<Tag>,
  ) {}

  private async getById(id: string): Promise<Tag> {
    try {
      return await this.repository.findOneBy({ id });
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }

  async insert(model: Tag): Promise<void> {
    try {
      await this.repository.insert(model);
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }

  async update(id: string, status: TagStatus): Promise<void> {
    const tag = await this.guard(id);

    try {
      tag.status = status;

      await this.repository.save(tag);
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    await this.guard(id);

    try {
      await this.repository.delete({ id });
    } catch (error) {
      throw new SharedDatabaseException(error.message);
    }
  }

  private async guard(id: string): Promise<Tag> {
    if (id.length === 0) return;

    const tag = await this.getById(id);

    if (!tag) throw new Error(`Tag ${id}  does not exists.`);

    return tag;
  }
}
