import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DataFieldValidatorAddDto {
  @IsNumber()
  sequence: number;
  @IsNotEmpty()
  @IsString()
  validatorId: string;
  @IsNotEmpty()
  @IsString()
  validatorName: string;
}
