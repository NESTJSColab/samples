import { ICommand } from 'nestjscolab.ddd';

export class DataFieldChangeFieldNameCommand implements ICommand {
  constructor(readonly id: string, readonly newFieldName: string) {}
}
