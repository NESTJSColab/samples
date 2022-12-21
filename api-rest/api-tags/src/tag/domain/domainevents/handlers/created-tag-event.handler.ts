

import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { TagRepository } from "src/tag/infrastructure/database";
import { CreatedTagDomainEvent } from '../created-tag.domainevent';

@EventsHandler(CreatedTagDomainEvent)
export class CreatedTagEventHandler implements IEventHandler<CreatedTagDomainEvent> {
  constructor(
    private repository: TagRepository,
    private eventBus: EventBus) { }

  async handle(event: CreatedTagDomainEvent) {
    //Create an integration event
    console.log("Domain Event fired")
  }
}