import { Repository, EntityRepository } from 'typeorm';

import { User } from './entities';
import { UserFilterType } from './types';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async GetAll(filter: UserFilterType): Promise<User[]> {
    const { nickname, status, search } = filter;

    const query = this.createQueryBuilder('user');

    query.where('user.status = :filterStatus', { filterStatus: status });

    if (nickname) query.andWhere('user.nickname = :nickname', { nickname });

    if (search)
      query.andWhere('(user.fullname LIKE :search)', { search: `%${search}%` });

    query.orderBy('user.fullname', 'DESC');

    return await query.getMany();
  }

  async Insert(user: User): Promise<User> {
    try {
      return await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
