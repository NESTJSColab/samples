import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { TagRepository } from 'src/tag/infrastructure/database';
import { CreateTagCommand } from '../create-tag.command';
import { TagDomain } from 'src/tag/domain';
import { Id } from 'src/tag/domain/id.domain';
import { Key } from 'src/tag/domain/key.domain';
import { Name } from 'src/tag/domain/name.domain';
import { TrackId } from 'src/tag/domain/trackid.domain';

@CommandHandler(CreateTagCommand)
export class CreateTagCommandHandler
  implements ICommandHandler<CreateTagCommand>
{
  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateTagCommand): Promise<void> {
    const id = Id.generate();

    const tagDomain = TagDomain.Create(
      new TrackId(command.trackId),
      new Id(id),
      new Key(command.key),
      new Name(command.name),
    );

    const tagMerged = this.publisher.mergeObjectContext(tagDomain);

    await this.tagRepository.insert(tagMerged);

    tagMerged.commit();
  }
}
