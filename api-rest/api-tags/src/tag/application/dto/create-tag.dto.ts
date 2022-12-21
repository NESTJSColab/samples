
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto  {
  @IsString()
  @IsNotEmpty()
  key: string;
  @IsString()
  @IsNotEmpty()
  name: string;  
}
