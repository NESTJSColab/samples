import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthSignInInput, TokenType } from './types';
import { SignInResult } from './dto/auth-result.dto';
import { UsersService } from 'src/users/users.service';
import { UserCreateType, UserType } from 'src/users/types';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Query(() => TokenType)
  async signIn(@Args('input') input: AuthSignInInput): Promise<SignInResult> {
    return await this.authService.signIn(input);
  }

  @Mutation(() => UserType)
  async signUp(@Args('input') input: UserCreateType) {
    return await this.userService.Create(input);
  }
}
