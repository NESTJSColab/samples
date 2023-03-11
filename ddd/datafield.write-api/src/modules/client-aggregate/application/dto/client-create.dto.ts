import { IsNotEmpty } from 'class-validator';
import { DatapassDto } from './datapase.dto';
import { TargetDto } from './target.dto';

export class ClientCreateDto {
  @IsNotEmpty()
  name: string;
  datapasses: DatapassDto[];
  targets: TargetDto[];
}
