import { ValueObject, Guard } from 'nestjscolab.ddd';
import { DataFieldException } from './datafield.exception';

export interface IDatafieldTargetProps {
  id: string;
  code: string;
  name: string;
}
export class DatafieldTarget extends ValueObject<IDatafieldTargetProps> {
  protected validate(props: IDatafieldTargetProps): void {
    const { name, code } = props;

    if (Guard.isEmpty(code))
      throw new DataFieldException('Code cannot be null or empty');

    if (Guard.isEmpty(name))
      throw new DataFieldException('Name cannot be null or empty');
  }

  static create(id: string, code: string, name: string) {
    return new DatafieldTarget({ id, code, name });
  }
}
