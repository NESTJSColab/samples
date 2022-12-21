import { Field, InputType, ID } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
class UserEditType {
  @Field(() => ID)
  id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(250)
  @Field()
  email: string;

  @MinLength(3)
  @MaxLength(250)
  @Field()
  fullname: string;

  @Field({ nullable: true })
  nickname: string;
}

export default UserEditType;
