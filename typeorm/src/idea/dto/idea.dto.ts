import { AutoMap } from '@automapper/classes';

export class IdeaDto {
  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  tags: string[];

  @AutoMap()
  owner: string;
}

export class CreateIdeaDto extends IdeaDto {}

export class UpdateIdeaDto extends IdeaDto {}

export class ApproveIdeaDto extends IdeaDto {
  id: string;
}

export class IdeaItemDto {
  @AutoMap()
  ideaId: string;

  @AutoMap()
  type: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;
}
