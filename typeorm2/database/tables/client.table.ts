import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DatapassTable } from './datapass.table';
import { TargetTable } from './target.table';

@Entity('clients')
export class ClientTable {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => TargetTable, (target) => target.client)
  targets: TargetTable[];

  @OneToMany(() => DatapassTable, (datapass) => datapass.client)
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
