import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryColumn } from 'typeorm';

/*
IDEATYPES: Defining a One To Many relationship (Foreign Key) to IdeaItem
*/
@Entity()
export class IdeaItemType {
  @AutoMap()
  @PrimaryColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;
}
