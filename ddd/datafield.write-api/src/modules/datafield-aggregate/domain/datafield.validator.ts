import { ValueObject } from 'nestjscolab.ddd';

import { Id } from '../../../shared';

export interface IDataFieldValidatorProps {
  id: Id;
  sequence: number;
  name: string;
}

export class DataFieldValidator extends ValueObject<IDataFieldValidatorProps> {
  protected validate(props: IDataFieldValidatorProps): void {
    throw new Error('Method not implemented.');
  }

  static create(props: IDataFieldValidatorProps) {
    return new DataFieldValidator(props);
  }
}
