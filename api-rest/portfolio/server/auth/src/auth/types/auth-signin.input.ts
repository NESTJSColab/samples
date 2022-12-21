import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

@InputType()
class AuthSignInInput {
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
}

export default AuthSignInInput;
