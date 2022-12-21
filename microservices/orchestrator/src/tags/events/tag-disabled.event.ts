import { SharedDomainEvent } from 'beyondnet.nestjssharedlib/dist/src/domain';
import { TagEvents } from 'src/common/constants';

export class TagDisabledEvent extends SharedDomainEvent {
  constructor(trackId: string, aggregateId: string) {
    super(
      trackId,
      aggregateId,
      TagEvents.DISABLED,
      'tagdisabled.event',
      { trackId, aggregateId },
      'tags-agent',
    );
  }

  setData(data: any): void {
    this.data = data;
  }
}
