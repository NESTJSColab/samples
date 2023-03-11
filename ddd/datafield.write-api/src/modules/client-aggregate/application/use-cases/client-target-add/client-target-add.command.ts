import { ICommand } from 'nestjscolab.ddd';

export class ClientTargetAddCommand implements ICommand {
  constructor(readonly clientId: string, readonly name: string) {}
}
