import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { IWriteDatafieldRepository } from '../../domain';
import { DatabaseException, DataFieldTable } from '../../../../database';
import { DataField } from '../../domain/datafield';

@Injectable()
export class DataFieldWriteRepository implements IWriteDatafieldRepository {
  constructor(
    @InjectRepository(DataFieldTable)
    private readonly repository: Repository<DataFieldTable>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async save(item: DataField): Promise<void> {
    try {
      const table = await this.mapper.mapAsync(item, DataField, DataFieldTable);

      await this.repository.save(table);
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
