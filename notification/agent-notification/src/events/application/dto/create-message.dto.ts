import { IsNotEmpty, IsString } from 'class-validator';

export class DataDto {
  message: string;
  date: string;
}

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  trackId: string;
  @IsString()
  @IsNotEmpty()
  process: string;
  data: DataDto;
  createdAt: string;
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
