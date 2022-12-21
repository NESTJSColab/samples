import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

/* TODO: Evaluate
  SAMPLE:
  @ObjectType()
  class PaginatedAuthor extends Paginated(Author) {}
*/
export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  // tslint:disable-next-line: max-classes-per-file
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(() => [classRef], { nullable: true })
    nodes: T[];

    @Field(() => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType;
}
