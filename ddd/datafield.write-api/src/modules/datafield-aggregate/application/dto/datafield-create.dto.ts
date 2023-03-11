import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { dataFieldTargetDto, DataFieldValidatorDto } from './common';

export class DataFieldCreateDto {
  @IsNotEmpty()
  @IsNumber()
  sequence: number;
  @IsNotEmpty()
  @IsString()
  fieldName: string;
  @IsNotEmpty()
  @IsString()
  target: dataFieldTargetDto;
  @IsNotEmpty()
  validators: DataFieldValidatorDto[];
}
