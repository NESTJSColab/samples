import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ClientDatapassAddDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;
  @IsNumber()
  sequence: number;
  @IsNotEmpty()
  @IsString()
  name: string;
}
