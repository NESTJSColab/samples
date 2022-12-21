import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { TagRepository } from 'src/tag/infrastructure/database';
import { DeleteTagCommand } from '../delete-tag.command';
import { TrackId } from 'src/tag/domain/trackid.domain';

@CommandHandler(DeleteTagCommand)
export class DeleteTagCommandHandler
  implements ICommandHandler<DeleteTagCommand>
{
  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteTagCommand): Promise<void> {
    const tagDomain = await this.tagRepository.getById(command.id);

    tagDomain.Disable(new TrackId(command.trackId));

    const tagMerged = this.publisher.mergeObjectContext(tagDomain);

    await this.tagRepository.delete(tagDomain.id.value());

    tagMerged.commit();
  }
}
