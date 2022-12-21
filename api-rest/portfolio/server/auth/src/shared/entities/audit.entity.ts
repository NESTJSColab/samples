import { Column, Timestamp, UpdateDateColumn } from 'typeorm';

// TODO: Review UTC Date, verify if it is ok
export class Audit {
  @Column()
  createdUser: string;

  @Column({
    type: 'timestamp with time zone',
    default: 'now()',
  })
  createdAt: Date;

  @Column({ nullable: true })
  updatedUser: string;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: 'now()',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  lastChange: Timestamp;

  constructor(nickname: string) {
    this.createdUser = nickname;
    this.createdAt = new Date();
  }
}
