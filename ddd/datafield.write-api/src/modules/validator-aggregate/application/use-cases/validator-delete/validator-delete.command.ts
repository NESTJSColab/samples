import { ICommand } from 'nestjscolab.ddd';

export class ValidatorDeleteCommand implements ICommand {
  constructor(readonly id: string) {}
}
