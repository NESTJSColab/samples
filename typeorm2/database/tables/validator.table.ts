import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('validators')
export class ValidatorTable {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

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
