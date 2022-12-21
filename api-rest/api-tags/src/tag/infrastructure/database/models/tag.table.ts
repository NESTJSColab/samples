import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Tag {
  @AutoMap()
  @PrimaryColumn()
  id: string;
  @AutoMap()
  @Column()
  key: string;
  @AutoMap()
  @Column()
  name: string;
  @AutoMap()
  @Column({ default: 1 })
  status: number;
}
