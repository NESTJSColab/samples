import { IsNotEmpty } from 'class-validator';

export class ValidatorCreateDto {
  @IsNotEmpty()
  name: string;
}
