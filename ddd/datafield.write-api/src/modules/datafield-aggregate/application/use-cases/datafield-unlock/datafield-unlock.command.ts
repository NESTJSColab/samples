import { ICommand } from 'nestjscolab.ddd';

export class DataFieldUnlockCommand implements ICommand {
  constructor(readonly id: string) {}
}
