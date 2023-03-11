import { ICommand } from 'nestjscolab.ddd';

export class ClientRemoveDatapassFromTargetCommand implements ICommand {
  constructor(readonly targetId: string, readonly datapassId: string) {}
}
