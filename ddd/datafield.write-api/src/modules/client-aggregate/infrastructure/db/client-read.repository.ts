/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaginatedQueryParams, Paginated } from 'nestjscolab.ddd';

import { IClientReadRepository } from '../../domain';
import {
  DatapassTable,
  ClientTable,
  DatabaseException,
  TargetTable,
} from '../../../../database';

@Injectable()
export class ClientReadRepository implements IClientReadRepository {
  constructor(
    @InjectRepository(ClientTable)
    private readonly repository: Repository<ClientTable>,
    @InjectRepository(TargetTable)
    private readonly targetRepository: Repository<TargetTable>,
    @InjectRepository(DatapassTable)
    private readonly datapassRepository: Repository<DatapassTable>,
  ) {}
  fetch(): Promise<ClientTable[]> {
    throw new Error('Method not implemented.');
  }
  fetchAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<ClientTable>> {
    throw new Error('Method not implemented.');
  }

  async fetchTargetById(id: string): Promise<TargetTable> {
    try {
      return await this.targetRepository.findOne({
        relations: {
          datapasses: true,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async fetchDatapassById(id: string): Promise<DatapassTable> {
    try {
      return await this.datapassRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async fetchById(id: string): Promise<ClientTable> {
    try {
      return await this.repository.findOne({
        relations: {
          targets: true,
          datapasses: true,
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
