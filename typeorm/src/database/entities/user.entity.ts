import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Audit } from '.';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column(() => Audit)
  audit: Audit;
}
