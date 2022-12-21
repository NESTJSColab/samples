import { SharedDomainEvent } from "beyondnet.nestjssharedlib/dist/src/domain";
import { TagEvents } from '../../../common/constants';


export class EnabledTagDomainEvent extends SharedDomainEvent {
  constructor(trackId: string, aggregateId: string) {
    super(trackId, aggregateId, TagEvents.ENABLED, "tagenabled.domainevent", null);
  }
  setData(data: any): void {
    this.data = data;
  }
}