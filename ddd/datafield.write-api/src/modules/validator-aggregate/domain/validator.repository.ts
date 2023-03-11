/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  IReadRepository,
  ITransationRepository,
  IWriteRepository,
} from 'nestjscolab.ddd';

import { ValidatorTable } from '../../../database';
import { Validator } from './validator';

export interface IWriteValidatorRepository
  extends IWriteRepository<string, Validator> {}

export interface ITransationValidatorRepository
  extends ITransationRepository<Validator> {}

export interface IReadValidatorRepository
  extends IReadRepository<string, ValidatorTable> {}
