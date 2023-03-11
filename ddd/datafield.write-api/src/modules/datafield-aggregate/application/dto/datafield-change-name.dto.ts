import { IsNotEmpty, IsString, Length } from 'class-validator';

export class DataFieldChangeFieldNameDto {
  @IsNotEmpty()
  @IsString()
  @Length(36)
  id: string;
  @IsNotEmpty()
  @IsString()
  newName: string;
}
