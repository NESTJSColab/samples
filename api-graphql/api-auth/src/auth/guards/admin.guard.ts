import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from '../../graphql.classes';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext().req;

    if (request.user) {
      const user = <User>request.user;
      if (this.usersService.isAdmin(user.permissions)) return true;
    }

    throw new AuthenticationError(
      'Could not authenticate with token or user does not have permissions',
    );
  }
}
