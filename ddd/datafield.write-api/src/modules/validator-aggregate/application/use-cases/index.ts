import { ValidatorCreateController } from './validator-create';
import { ValidatorCreateCommandHanler } from './validator-create/validator-create.command-handler';
import { ValidatorDeleteController } from './validator-delete';
import { ValidatorDeleteCommandHandler } from './validator-delete/validator-delete.command-handler';

export const commandHandlers = [
  ValidatorCreateCommandHanler,
  ValidatorDeleteCommandHandler,
];

export const controllers = [
  ValidatorCreateController,
  ValidatorDeleteController,
];
