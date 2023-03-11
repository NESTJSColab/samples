import { ICommand } from 'nestjscolab.ddd';

export class ValidatorCreateCommand implements ICommand {
  constructor(readonly name: string) {}
}
