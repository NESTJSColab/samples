import { Guard, StringValueObject } from 'nestjscolab.ddd';

import { ValidatorException } from './validator.exception';

export class ValidatorName extends StringValueObject {
  constructor(props: { value: string }) {
    super(props);
  }

  protected validate(props: { value: string }): void {
    if (!Guard.lengthIsBetween(props.value, 5, 300))
      throw new ValidatorException('Invalid length. Range[5,300]');
  }

  public static create(value: string): ValidatorName {
    return new ValidatorName({ value });
  }
}
