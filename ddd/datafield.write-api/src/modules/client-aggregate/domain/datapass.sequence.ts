import { DddNumberValueObject } from 'nestjscolab.ddd';

export class DatapassSequence extends DddNumberValueObject {
  constructor(props: { value: number }) {
    super(props);
  }

  public static create(value: number): DatapassSequence {
    return new DatapassSequence({ value });
  }
}
