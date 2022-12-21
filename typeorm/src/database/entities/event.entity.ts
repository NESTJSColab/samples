import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['description', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  description: string;

  @Column('json')
  payload: Record<string, any>;
}
