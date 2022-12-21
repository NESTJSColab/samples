import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { Audit } from './audit.entity';
import { IdeaItemType } from './ideaitemtype.entity';
import { Idea } from '.';

/*
  IDEAITEMS: Defining a One To Many relationship with Idea
*/
@Entity()
export class IdeaItem {
  @PrimaryColumn()
  id: string;

  @AutoMap({ typeFn: () => Idea })
  @OneToOne(() => Idea)
  idea: Idea;

  @Column({ nullable: true })
  ideaId: string;

  @AutoMap()
  @JoinColumn({ name: 'ideaItemTypeId' })
  @OneToOne(() => IdeaItemType)
  type: IdeaItemType;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  description: string;

  @Column(() => Audit)
  audit: Audit;
}
