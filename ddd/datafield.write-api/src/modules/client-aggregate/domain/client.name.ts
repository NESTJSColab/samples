import { Guard, DddStringValueObject } from 'nestjscolab.ddd';

import { ClientException } from './client.exception';

export class ClientName extends DddStringValueObject {
  constructor(props: { value: string }) {
    super(props);
  }

  protected validate(props: { value: string }): void {
    if (!Guard.lengthIsBetween(props.value, 5, 300))
      throw new ClientException('Invalid length. Range[5,300]');
  }

  public static create(value: string): ClientName {
    return new ClientName({ value });
  }
}
