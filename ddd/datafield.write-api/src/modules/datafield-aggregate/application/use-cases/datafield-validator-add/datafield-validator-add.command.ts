import { ICommand } from 'nestjscolab.ddd';

export class DataFieldValidatorAddCommand implements ICommand {
  constructor(
    readonly dataFieldId: string,
    readonly sequence: number,
    readonly validatorId: string,
    readonly validatorName: string,
  ) {}
}
