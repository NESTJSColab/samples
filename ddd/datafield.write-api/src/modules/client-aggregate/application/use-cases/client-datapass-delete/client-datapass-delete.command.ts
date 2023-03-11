import { ICommand } from 'nestjscolab.ddd';

export class ClientDatapassDeleteCommand implements ICommand {
  constructor(readonly clientId: string, readonly id: string) {}
}
