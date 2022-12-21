import { SharedDomainEvent } from "beyondnet.nestjssharedlib/dist/src/domain";
import { TagEvents } from '../../../common/constants';


export class DisabledTagDomainEvent extends SharedDomainEvent {
  constructor(trackId: string, aggregateId: string) {
    super(trackId, aggregateId, TagEvents.DISABLED, "tagdisabled.domainevent", null);
  }
  setData(data: any): void {
    this.data = data;
  }
}