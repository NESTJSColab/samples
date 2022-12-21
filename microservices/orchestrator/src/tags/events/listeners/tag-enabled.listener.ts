import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TagEvents } from 'src/common/constants';
import { ConfigService } from '@nestjs/config';

import { TagRepository } from 'src/tags/database';
import { AbstractTagEventListener } from './tag-event.listener';
import { TagStatus } from 'src/tags/database/models/tag.table';
import { TagEnabledEvent } from '../tag-enabled.event';
import { SharedRMQClientProxy } from 'beyondnet.nestjssharedlib/dist/src';

@Injectable()
export class TagEnabledListener extends AbstractTagEventListener {
  constructor(
    private readonly repository: TagRepository,
    readonly clientProxyTagEvents: SharedRMQClientProxy,
    readonly config: ConfigService,
  ) {
    super(clientProxyTagEvents, config);
  }

  @OnEvent(TagEvents.ENABLED, { async: true })
  async handleOn(payload: TagEnabledEvent) {
    // Persist Projection
    await this.repository.update(payload.aggregateId, TagStatus.ACTIVE);

    // Publish event
    const { trackId, aggregateId } = payload;
    payload.setData({ trackId, aggregateId });
    await this.publishEvent(payload);
  }
}
