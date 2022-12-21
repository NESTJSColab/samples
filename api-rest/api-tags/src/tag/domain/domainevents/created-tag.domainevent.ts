import { TagEvents } from '../../../common/constants';
import { SharedDomainEvent } from "beyondnet.nestjssharedlib/dist/src/domain";

export class CreatedTagDomainEvent extends SharedDomainEvent {
  key: string;
  name: string;

  constructor(trackId: string, aggregateId: string, key: string, name: string) {
    super(trackId, aggregateId, TagEvents.CREATED, "cratedtag.domainevent", null);

    this.key = key;
    this.name = name;

  }

  setData(data: any): void {
    this.data = data;
  }
}