import { ICommand } from 'nestjscolab.ddd';

export class ClientTargetDeleteCommand implements ICommand {
  constructor(readonly clientId: string, readonly id: string) {}
}
