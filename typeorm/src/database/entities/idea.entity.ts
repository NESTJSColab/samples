import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { IdeaItem, Tag, User } from '.';
import { Audit } from './audit.entity';

/*
IDEA: Defining a root entity
*/

@Entity()
export class Idea {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.ideas, {
    cascade: true,
  })
  tags: Tag[];

  @AutoMap({ typeFn: () => IdeaItem })
  @OneToMany(() => IdeaItem, (ideaItem) => ideaItem.idea)
  items: IdeaItem[];

  @OneToOne(() => User)
  @JoinTable()
  owner: User;

  @Column(() => Audit)
  audit: Audit;
}
