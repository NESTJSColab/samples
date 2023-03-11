/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaginatedQueryParams, Paginated } from 'nestjscolab.ddd';

import { IReadDatafieldRepository } from '../../domain';
import { DataFieldTable, DatabaseException } from '../../../../database';

@Injectable()
export class DataFieldReadRepository implements IReadDatafieldRepository {
  constructor(
    @InjectRepository(DataFieldTable)
    private readonly repository: Repository<DataFieldTable>,
  ) {}
  fetch(): Promise<DataFieldTable[]> {
    throw new Error('Method not implemented.');
  }
  fetchAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<DataFieldTable>> {
    throw new Error('Method not implemented.');
  }

  async fetchById(id: string): Promise<DataFieldTable> {
    try {
      return await this.repository.findOne({
        relations: {
          target: true,
          validators: true,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
