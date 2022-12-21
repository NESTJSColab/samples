import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  UserEditType,
  UserFilterType,
  UserCreateType,
  UserType,
} from './types';
import { UsersService } from './users.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @Query(() => [UserType])
  async GetAll(@Args('input') input: UserFilterType) {
    const users = await this.userService.GetAll(input);

    return users;
  }

  @Query(() => UserType)
  async GetById(@Args('id') id: string) {
    return await this.userService.GetById(id);
  }

  @Mutation(() => UserType)
  async Create(@Args('input') input: UserCreateType) {
    return await this.userService.Create(input);
  }

  @Mutation(() => UserType)
  async Update(@Args('input') input: UserEditType) {
    return await this.userService.Update(input);
  }

  @Mutation(() => UserType)
  async Delete(@Args('id') id: string) {
    return await this.Delete(id);
  }
}
