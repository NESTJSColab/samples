import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  password: string;

  @Field()
  nickname: string;

  @Field()
  salt: string;

  @Field()
  fullname: string;
}

export default UserType;
