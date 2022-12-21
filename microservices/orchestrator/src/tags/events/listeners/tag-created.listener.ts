import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

import { TagEvents } from 'src/common/constants';
import { TagRepository } from 'src/tags/database';
import { Tag } from 'src/tags/database/models';
import { TagStatus } from 'src/tags/database/models/tag.table';
import { TagCreatedEvent } from '../tag-created.event';
import { SharedRMQClientProxy } from 'beyondnet.nestjssharedlib/dist/src/';
import { AbstractTagEventListener } from './tag-event.listener';

@Injectable()
export class TagCreatedListener extends AbstractTagEventListener {
  constructor(
    readonly repository: TagRepository,
    readonly clientProxyTagEvents: SharedRMQClientProxy,
    readonly config: ConfigService,
  ) {
    super(clientProxyTagEvents, config);
  }

  @OnEvent(TagEvents.CREATED, { async: true })
  async handleOn(payload: TagCreatedEvent) {
    const table = new Tag();
    table.id = uuidv4();
    table.key = payload.key;
    table.name = payload.name;
    table.status = TagStatus.ACTIVE;

    // Persist Projection
    await this.repository.insert(table);

    // Publish event
    payload.setData(table);

    await this.publishEvent(payload);
  }
}
