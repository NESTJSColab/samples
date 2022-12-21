import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Idea } from '.';

/*
 TAGS: Defining a Many To Many relationship with Idea 
 */
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @ManyToMany(() => Idea, (idea) => idea.tags)
  ideas: Idea[];
}
