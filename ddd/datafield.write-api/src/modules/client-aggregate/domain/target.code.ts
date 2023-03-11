import { Guard, DddUidValueObject } from 'nestjscolab.ddd';

import { TargetException } from './target.exception';

export class TargetCode extends DddUidValueObject {
  constructor(props: { value: string }) {
    super(props);
  }

  protected validate(props: { value: string }): void {
    if (!Guard.lenghtIsEqual(props.value, 36))
      throw new TargetException('Target code is not valid');
  }

  public static create(value: string): TargetCode {
    return new TargetCode({ value });
  }
}
