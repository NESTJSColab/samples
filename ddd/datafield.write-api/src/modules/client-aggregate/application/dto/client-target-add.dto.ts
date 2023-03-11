import { IsNotEmpty, IsString } from 'class-validator';

export class ClientTargetAddDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}
