import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TargetTable } from './target.table';
import { ValidatorTable } from './validator.table';

@Entity('datafields')
export class DataFieldTable {
  @PrimaryColumn()
  id: string;

  @Column()
  fieldname: string;

  @Column()
  sequence: number;

  @ManyToOne(() => TargetTable, (target) => target.datafields)
  target: TargetTable;

  @ManyToMany(() => ValidatorTable)
  @JoinTable()
  validators: ValidatorTable[];

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
