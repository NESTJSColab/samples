import { ICommand } from 'nestjscolab.ddd';
import { DataFieldTargetCommand, DataFieldValidatorCommand } from '../common';

export class DataFieldCreateCommand implements ICommand {
  constructor(
    readonly target: DataFieldTargetCommand,
    readonly sequence: number,
    readonly fieldName: string,
    readonly validators: DataFieldValidatorCommand[],
  ) {}
}
