import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IClientWriteRepository, Client, Target } from '../../domain';
import {
  ClientTable,
  DatabaseException,
  TargetTable,
} from '../../../../database';

@Injectable()
export class ClientWriteRepository implements IClientWriteRepository {
  constructor(
    @InjectRepository(ClientTable)
    private readonly repository: Repository<ClientTable>,
    @InjectRepository(TargetTable)
    private readonly targetRepository: Repository<TargetTable>,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async save(item: Client): Promise<void> {
    try {
      const client = await this.mapper.mapAsync(item, Client, ClientTable);

      this.repository.manager.transaction(async (tm) => {
        await tm.save(client);
        await tm.save(client.datapasses);
        await tm.save(client.targets);
      });
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async saveDatapassToTarget(target: Target): Promise<void> {
    try {
      const targetTable = await this.mapper.mapAsync(
        target,
        Target,
        TargetTable,
      );

      this.targetRepository.manager.transaction(async (tm) => {
        await tm.save(targetTable);
        await tm.save(targetTable.datapasses);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeDatapassToTarget(target: Target): Promise<void> {
    try {
      const targetTable = await this.mapper.mapAsync(
        target,
        Target,
        TargetTable,
      );

      this.targetRepository.manager.transaction(async (tm) => {
        await tm.save(targetTable);
      });
    } catch (error) {
      throw new Error(error);
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
