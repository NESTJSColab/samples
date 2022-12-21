import { SharedDomainEvent } from "beyondnet.nestjssharedlib/dist/src/domain";
import { TagEvents } from "src/common/constants";

export class DeletedTagDomainEvent extends SharedDomainEvent{

 constructor(trackId: string, aggregateId: string) {
   super(trackId, aggregateId, TagEvents.DELETED, "deletedtag.domainevent", null);
 }

  setData(data: any): void {
   this.data = data;
 }
}