import { Field, InputType } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
class AuthSignUpInput {
  @IsString()
  @MinLength(4)
  @MaxLength(250)
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @Field()
  password: string;

  @MinLength(3)
  @MaxLength(250)
  @Field()
  fullname: string;

  @Field({ nullable: true })
  nickname: string;
}

export default AuthSignUpInput;
