import { ICommand } from 'nestjscolab.ddd';

export class DataFieldDeleteCommand implements ICommand {
  constructor(readonly id: string) {}
}
