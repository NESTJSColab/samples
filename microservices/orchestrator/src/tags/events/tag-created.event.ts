import { IsNotEmpty, IsString } from 'class-validator';

import { SharedDomainEvent } from 'beyondnet.nestjssharedlib/dist/src/domain';
import { TagEvents } from 'src/common/constants';

export class TagCreatedEvent extends SharedDomainEvent {
  @IsString()
  @IsNotEmpty()
  key: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(trackId: string, aggregateId: string, key: string, name: string) {
    super(
      trackId,
      aggregateId,
      TagEvents.CREATED,
      'tagcreated.event',
      'tags-agent',
    );
    this.key = key;
    this.name = name;
  }

  setData(data: any): void {
    this.data = data;
  }
}
