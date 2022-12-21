import { UserType } from 'src/users/types';
import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { UserStatus } from './user-status.enum';
import { Audit } from 'src/shared/entities';

@Entity()
@Unique(['email'])
class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: true })
  salt: string;

  @Column(() => Audit)
  audit: Audit;

  @Column()
  status: UserStatus;

  private constructor() {
    super();
  }

  static Add(
    email: string,
    password: string,
    nickname: string,
    fullname: string,
    salt: string,
    audit: Audit,
  ): User {
    const user = new User();
    user.id = uuid();
    user.email = email;
    user.password = password;
    user.nickname = nickname;
    user.fullname = fullname;
    user.salt = salt;
    user.status = UserStatus.ACTIVE;
    user.audit = audit;
    return user;
  }

  static ChangeNickname(user: User, nickname: string): User {
    user.nickname = nickname;
    return user;
  }

  static ChangeFullName(user: User, fullname: string): User {
    user.fullname = fullname;
    return user;
  }

  static IsValidPassword(user: UserType, passwordHashed: string) {
    return user.password === passwordHashed;
  }
}

export default User;
