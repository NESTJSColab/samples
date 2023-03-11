import { Guard, StringValueObject } from 'nestjscolab.ddd';

import { DataFieldException } from './datafield.exception';

export class DataFieldName extends StringValueObject {
  constructor(props: { value: string }) {
    super(props);
  }

  protected validate(props: { value: string }): void {
    if (!Guard.lengthIsBetween(props.value, 5, 300))
      throw new DataFieldException('Invalid length. Range[5,300]');
  }

  public static create(value: string): DataFieldName {
    return new DataFieldName({ value });
  }
}
