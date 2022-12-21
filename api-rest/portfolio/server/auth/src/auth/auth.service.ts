import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';

import { AuthSignInInput } from './types';
import { SignInResult } from './dto/auth-result.dto';
import { JwtPayload } from './providers';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities';
import { UserCreateType, UserType } from 'src/users/types';

const jwtConfig = config.get('jwt');

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(input: UserCreateType): Promise<UserType> {
    return await this.userService.Create(input);
  }

  async signIn(input: AuthSignInInput): Promise<SignInResult> {
    const { email, password } = input;

    const user = await this.userService.GetByEmail(email);

    if (!user)
      throw new HttpException('User does not exist.', HttpStatus.BAD_REQUEST);

    const passwordHashed = await this.userService.hashPassword(
      password,
      user.salt,
    );

    if (!User.IsValidPassword(user, passwordHashed))
      throw new HttpException(
        'Credentials are invalid',
        HttpStatus.BAD_REQUEST,
      );

    const { nickname, fullname } = user;

    const payload: JwtPayload = { email, nickname, fullname };

    const accessToken = await this.jwtService.sign(payload);

    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return new SignInResult(accessToken, jwtConfig.expiresIn);
  }
}
