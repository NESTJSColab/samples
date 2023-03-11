import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { IWriteValidatorRepository } from '../../domain';
import { DatabaseException, ValidatorTable } from '../../../../database';
import { Validator } from '../../domain/Validator';

@Injectable()
export class ValidatorWriteRepository implements IWriteValidatorRepository {
  constructor(
    @InjectRepository(ValidatorTable)
    private readonly repository: Repository<ValidatorTable>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async save(item: Validator): Promise<void> {
    try {
      const table = await this.mapper.mapAsync(item, Validator, ValidatorTable);

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
