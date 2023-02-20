import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ClientTable } from './client.table';

@Entity('datapasses')
export class DatapassTable {
  @PrimaryColumn()
  id: string;

  @Column()
  sequence: number;

  @Column()
  name: string;

  @ManyToOne(() => ClientTable, (target) => target.datapasses)
  client: ClientTable;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column()
  status: string;
}
