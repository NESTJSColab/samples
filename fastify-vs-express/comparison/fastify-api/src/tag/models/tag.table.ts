import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  key: string;

  @ApiProperty()
  @Column()
  name: string;

  @Column({ default: 1 })
  status: number;
}
