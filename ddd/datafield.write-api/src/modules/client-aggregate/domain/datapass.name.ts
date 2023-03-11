import { Guard, DddStringValueObject } from 'nestjscolab.ddd';

import { DatapassException } from './datapass.exception';

export class DatapassName extends DddStringValueObject {
  constructor(props: { value: string }) {
    super(props);
  }

  protected validate(props: { value: string }): void {
    if (!Guard.lengthIsBetween(props.value, 5, 300))
      throw new DatapassException('Invalid length. Range[5,300]');
  }

  public static create(value: string): DatapassName {
    return new DatapassName({ value });
  }
}
