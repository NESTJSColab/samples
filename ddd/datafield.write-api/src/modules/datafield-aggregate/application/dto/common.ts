import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DataFieldValidatorDto {
  @IsNumber()
  sequence: number;
  @IsString()
  validatorId: string;
}

export class dataFieldTargetDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
