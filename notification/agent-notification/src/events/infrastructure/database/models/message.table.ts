import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  trackId: string;

  @Column()
  process: string;

  @Column()
  data: string;

  @Column()
  createdAt: string;

  @Column()
  createdBy: string;
}
