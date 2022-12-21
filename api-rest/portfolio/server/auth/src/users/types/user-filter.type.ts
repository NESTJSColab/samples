import { Field, InputType } from '@nestjs/graphql';
import { UserStatus } from '../entities';

@InputType()
class UserFilterType {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field()
  status: UserStatus.ACTIVE | UserStatus.BLOCKED | UserStatus.INACTIVE;
}

export default UserFilterType;
