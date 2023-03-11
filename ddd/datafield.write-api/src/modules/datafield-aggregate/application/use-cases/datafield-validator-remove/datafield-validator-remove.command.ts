import { ICommand } from 'nestjscolab.ddd';

export class DataFieldValidatorRemoveCommand implements ICommand {
  constructor(readonly datafieldId: string, readonly id: string) {}
}
