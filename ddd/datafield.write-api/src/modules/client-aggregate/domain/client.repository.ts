/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  IDddWriteRepository,
  IDddReadRepository,
  IDddTransationRepository,
} from 'nestjscolab.ddd';

import { ClientTable } from '../../../database';
import { Client } from './client';

export interface IClientWriteRepository
  extends IDddWriteRepository<string, Client> {}

export interface IClientReadRepository
  extends IDddReadRepository<string, ClientTable> {}

export interface IClientTransactionRepository
  extends IDddTransationRepository<Client> {}
