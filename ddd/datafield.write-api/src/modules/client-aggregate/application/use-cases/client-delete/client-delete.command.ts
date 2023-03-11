import { ICommand } from 'nestjscolab.ddd';

export class ClientDeleteCommand implements ICommand {
  constructor(readonly id: string) {}
}
