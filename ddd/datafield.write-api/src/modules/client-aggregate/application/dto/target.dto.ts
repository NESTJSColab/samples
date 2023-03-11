import { IsNotEmpty, IsString } from 'class-validator';

export class TargetDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
