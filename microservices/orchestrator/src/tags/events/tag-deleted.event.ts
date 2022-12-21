import { SharedDomainEvent } from 'beyondnet.nestjssharedlib/dist/src/domain';
import { TagEvents } from 'src/common/constants';

export class TagDeletedEvent extends SharedDomainEvent {
  constructor(trackId, aggregateId: string) {
    super(
      trackId,
      aggregateId,
      TagEvents.DELETED,
      'tagdeleted.event',
      'tags-agent',
    );
  }

  setData(data: any): void {
    this.data = data;
  }
}
