import { NumberValueObject } from 'nestjscolab.ddd';

export class DatafieldSequence extends NumberValueObject {
  constructor(props: { value: number }) {
    super(props);
  }

  static create(sequence: number) {
    return new DatafieldSequence({ value: sequence });
  }
}
