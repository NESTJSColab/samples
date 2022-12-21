import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryColumn()
  id: string;
  @Column()
  aggregateId: string;
  @Column()
  eventType: string;
  @Column()
  eventName: string;
  @Column()
  data: string;
  @Column()
  createdAt: Date;
  @Column()
  createdBy: string;
}
