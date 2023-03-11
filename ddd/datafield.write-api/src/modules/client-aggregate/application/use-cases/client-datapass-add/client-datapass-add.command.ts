import { ICommand } from 'nestjscolab.ddd';

export class ClientDatapassAddCommand implements ICommand {
  constructor(
    readonly clientId: string,
    readonly sequence: number,
    readonly name: string,
  ) {}
}
