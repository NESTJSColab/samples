import { IDddCommand } from 'nestjscolab.ddd';
import { DatapassCommand, TargetCommand } from '../command';

export class ClientCreateCommand implements IDddCommand {
  constructor(
    readonly name: string,
    readonly targets: TargetCommand[],
    readonly datapasses: DatapassCommand[],
  ) {}
}
