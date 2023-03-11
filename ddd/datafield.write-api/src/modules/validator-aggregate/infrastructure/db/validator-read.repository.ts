/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaginatedQueryParams, Paginated } from 'nestjscolab.ddd';

import { IReadValidatorRepository } from '../../domain';
import { ValidatorTable, DatabaseException } from '../../../../database';

@Injectable()
export class ValidatorReadRepository implements IReadValidatorRepository {
  constructor(
    @InjectRepository(ValidatorTable)
    private readonly repository: Repository<ValidatorTable>,
  ) {}
  fetch(): Promise<ValidatorTable[]> {
    throw new DatabaseException('Method not implemented.');
  }
  fetchAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<ValidatorTable>> {
    throw new DatabaseException('Method not implemented.');
  }

  async fetchById(id: string): Promise<ValidatorTable> {
    try {
      return await this.repository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
