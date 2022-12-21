import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Token')
class TokenType {
  @Field()
  token: string;

  @Field()
  expiresIn: string;
}

export default TokenType;
