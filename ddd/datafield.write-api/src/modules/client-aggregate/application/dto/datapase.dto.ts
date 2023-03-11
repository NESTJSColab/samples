import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class DatapassDto {
  @IsNumber()
  sequence: number;
  @IsNotEmpty()
  @IsString()
  name: string;
}
