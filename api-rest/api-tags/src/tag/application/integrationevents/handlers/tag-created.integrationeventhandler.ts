
import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';

import { TagRepository } from "src/tag/infrastructure/database";
import { CreatedTagIntegrationEvent } from '../tag-created.integrationevent';



@EventsHandler(CreatedTagIntegrationEvent)
export class CreatedTagIntegrationEventHandler implements IEventHandler<CreatedTagIntegrationEvent> {
  constructor(
    private repository: TagRepository,
    private eventBus: EventBus) { }

  async handle(event: CreatedTagIntegrationEvent) {
    //Create an integration event
    console.log("Integration Event fired")
  }
}