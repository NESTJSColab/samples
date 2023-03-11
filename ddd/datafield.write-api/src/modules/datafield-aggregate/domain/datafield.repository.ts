/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  IReadRepository,
  ITransationRepository,
  IWriteRepository,
} from 'nestjscolab.ddd';
import { DataFieldTable } from '../../../database';

import { DataField } from './datafield';

export interface IWriteDatafieldRepository
  extends IWriteRepository<string, DataField> {}

export interface ITransationDataFieldRepository
  extends ITransationRepository<DataField> {}

export interface IReadDatafieldRepository
  extends IReadRepository<string, DataFieldTable> {}
