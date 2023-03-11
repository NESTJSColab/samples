import {
  ClientAssignDatapaseToTargetCommandHanler,
  ClientAssignDatapassToTargetController,
} from './client-assign-datapass-target';
import {
  ClientCreateCommandHanler,
  ClientCreateController,
} from './client-create';
import {
  ClientDeleteCommandHandler,
  ClientDeleteController,
} from './client-delete';
import { ClientRemoveDatapassFromTargetController } from './client-remove-datapass-target';
import { ClientDatapassAddCommandHandler } from './client-datapass-add/client-datapass-add.command-handler';
import { ClientDatapassAddController } from './client-datapass-add/client-datapass-add.controller';
import {
  ClientTargetAddCommandHanler,
  ClientTargetAddController,
} from './client-target-add';
import {
  ClientTargetDeleteCommandHanler,
  ClientTargetDeleteController,
} from './client-target-delete';
import {
  ClientDatapassDeleteCommandHandler,
  ClientDatapassDeleteController,
} from './client-datapass-delete';

export const commandHandlers = [
  ClientCreateCommandHanler,
  ClientDeleteCommandHandler,
  ClientTargetAddCommandHanler,
  ClientAssignDatapaseToTargetCommandHanler,
  ClientRemoveDatapassFromTargetController,
  ClientTargetDeleteCommandHanler,
  ClientDatapassAddCommandHandler,
  ClientDatapassDeleteCommandHandler,
];

export const controllers = [
  ClientCreateController,
  ClientDeleteController,
  ClientTargetAddController,
  ClientRemoveDatapassFromTargetController,
  ClientAssignDatapassToTargetController,
  ClientTargetDeleteController,
  ClientDatapassAddController,
  ClientDatapassDeleteController,
];
