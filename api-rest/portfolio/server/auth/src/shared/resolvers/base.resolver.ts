import { Type } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

/* TODO: Evaluate this technique
SAMPLE:
@Resolver((of) => Recipe)
export class RecipesResolver extends BaseResolver(Recipe) {
  constructor(private recipesService: RecipesService) {
    super();
  }
}
 */
export function BaseResolverBuilder<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class ResolverBuilder {
    @Query(() => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return [];
    }
  }
  return ResolverBuilder;
}
