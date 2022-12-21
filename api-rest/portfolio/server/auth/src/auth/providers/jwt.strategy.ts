import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as config from 'config';

import { JwtPayload } from '.';
import { User, UserStatus } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';
import { UserFilterType } from 'src/users/types';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsersService)
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userService.GetAll({
      email,
      status: UserStatus.ACTIVE,
    } as UserFilterType)[0];

    if (!user) {
      throw new HttpException(
        `User for ${payload.fullname} does not exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
