import { createParamDecorator } from '@nestjs/common';
import { User } from '../../users/entities';

export const GetUser = createParamDecorator(
  (_data, req): User => {
    return req.user;
  },
);
