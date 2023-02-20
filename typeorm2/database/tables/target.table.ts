import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ClientTable } from './client.table';
import { DataFieldTable } from './datafield.table';
import { DatapassTable } from './datapass.table';

@Entity('targets')
export class TargetTable {
  @PrimaryColumn()
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => DataFieldTable, (datafield) => datafield.target)
  datafields: DataFieldTable[];

  @ManyToOne(() => ClientTable, (target) => target.targets)
  client: ClientTable;

  @ManyToMany(() => DatapassTable)
  @JoinTable()
  datapasses: DatapassTable[];

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
