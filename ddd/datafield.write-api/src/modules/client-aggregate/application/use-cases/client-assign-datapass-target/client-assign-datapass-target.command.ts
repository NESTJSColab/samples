import { ICommand } from 'nestjscolab.ddd';

export class ClientAssingDatapassToTargetCommand implements ICommand {
  constructor(
    readonly clientId: string,
    readonly targetId: string,
    readonly datapassId: string,
  ) {}
}
