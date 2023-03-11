import { Guard, DddStringValueObject } from 'nestjscolab.ddd';

import { TargetException } from './target.exception';

export class TargetName extends DddStringValueObject {
  constructor(props: { value: string }) {
    super(props);
  }

  protected validate(props: { value: string }): void {
    if (!Guard.lengthIsBetween(props.value, 5, 300))
      throw new TargetException('Invalid length. Range[5,300]');
  }

  public static create(value: string): TargetName {
    return new TargetName({ value });
  }
}
