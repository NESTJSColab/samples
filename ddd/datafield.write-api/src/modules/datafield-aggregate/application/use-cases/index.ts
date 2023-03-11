import { DataFieldValidatorAddCommandHandler } from './datafield-validator-add/datafield-validator-add.command-handler';
import { DataFieldValidatorRemoveCommandHandler } from './datafield-validator-remove/datafield-validator-remove.command-handler';
import {
  DataFieldCreateCommandHanler,
  DataFieldCreateController,
} from './datafield-create';
import {
  DataFieldChangeFieldNameCommandHanler,
  DataFieldChangeFieldNameController,
} from './datafield-change-fieldname';
import {
  DataFieldLockCommandHanler,
  DataFieldLockController,
} from './datafield-lock';
import {
  DataFieldUnlockCommandHanler,
  DataFieldUnlockController,
} from './datafield-unlock';
import {
  DataFieldDeleteCommandHanler,
  DataFieldDeleteController,
} from './datafield-delete';
import { DataFieldValidatorAddController } from './datafield-validator-add';
import { DataFieldValidatorRemoveController } from './datafield-validator-remove';

export const commandHandlers = [
  DataFieldChangeFieldNameCommandHanler,
  DataFieldLockCommandHanler,
  DataFieldUnlockCommandHanler,
  DataFieldDeleteCommandHanler,
  DataFieldCreateCommandHanler,
  DataFieldValidatorAddCommandHandler,
  DataFieldValidatorRemoveCommandHandler,
];

export const controllers = [
  DataFieldChangeFieldNameController,
  DataFieldLockController,
  DataFieldUnlockController,
  DataFieldDeleteController,
  DataFieldCreateController,
  DataFieldValidatorAddController,
  DataFieldValidatorRemoveController,
];
