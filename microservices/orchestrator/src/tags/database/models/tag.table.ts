import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum TagStatus {
  ACTIVE = 1,
  DISABLED = 0,
}

@Entity()
export class Tag {
  @PrimaryColumn()
  id: string;
  @Column()
  key: string;
  @Column()
  name: string;
  @Column({ default: TagStatus.ACTIVE })
  status: number;
}
