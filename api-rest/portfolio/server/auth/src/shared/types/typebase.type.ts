import { Field, ObjectType } from '@nestjs/graphql';

import { Audit } from 'src/shared/entities';

@ObjectType()
class TypeBase {
  @Field()
  audit: Audit;
}

export default TypeBase;
