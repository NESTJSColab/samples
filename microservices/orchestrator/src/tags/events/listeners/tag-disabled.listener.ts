import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

import { TagRepository } from 'src/tags/database';
import { AbstractTagEventListener } from './tag-event.listener';
import { TagDisabledEvent } from '../tag-disabled.event';
import { TagStatus } from 'src/tags/database/models/tag.table';
import { SharedRMQClientProxy } from 'beyondnet.nestjssharedlib/dist/src';
import { TagEvents } from 'src/common/constants';

@Injectable()
export class TagDisabledListener extends AbstractTagEventListener {
  constructor(
    private readonly repository: TagRepository,
    readonly clientProxyTagEvents: SharedRMQClientProxy,
    readonly config: ConfigService,
  ) {
    super(clientProxyTagEvents, config);
  }

  @OnEvent(TagEvents.DISABLED, { async: true })
  async handleOn(payload: TagDisabledEvent) {
    // Persist Projection
    await this.repository.update(payload.aggregateId, TagStatus.DISABLED);

    // Publish event
    const { trackId, aggregateId } = payload;
    payload.setData({ trackId, aggregateId });
    await this.publishEvent(payload);
  }
}
