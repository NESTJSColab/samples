import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcryptjs';

import { User } from './entities';
import { Audit } from 'src/shared/entities';
import {
  UserEditType,
  UserFilterType,
  UserCreateType,
  UserType,
} from './types';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async GetAll(input: UserFilterType): Promise<UserType[]> {
    const users = await this.userRepository.GetAll(input);

    return users;
  }

  async GetById(id: string): Promise<UserType> {
    return await this.userRepository.findOne(id);
  }

  async GetByEmail(email: string): Promise<UserType> {
    return await this.userRepository.findOne({ email });
  }

  async Create(input: UserCreateType): Promise<UserType> {
    const { nickname, email, password, fullname } = input;

    const salt = await bcrypt.genSalt();
    const encryptedPassword = await this.hashPassword(password, salt);

    const user = User.Add(
      email,
      encryptedPassword,
      nickname,
      fullname,
      salt,
      new Audit(nickname),
    );

    return await this.userRepository.Insert(user);
  }

  async Update(input: UserEditType): Promise<UserType> {
    const { id, nickname, fullname } = input;

    const user = await this.userRepository.findOne({ id });

    if (!user) throw new NotFoundException('User does not exist');

    User.ChangeNickname(user, nickname);
    User.ChangeFullName(user, fullname);

    return await user.save();
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, salt: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, salt);
    return hash === password;
  }
}
