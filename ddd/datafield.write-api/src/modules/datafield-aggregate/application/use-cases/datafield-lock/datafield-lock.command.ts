import { ICommand } from 'nestjscolab.ddd';

export class DataFieldLockCommand implements ICommand {
  constructor(readonly id: string) {}
}
