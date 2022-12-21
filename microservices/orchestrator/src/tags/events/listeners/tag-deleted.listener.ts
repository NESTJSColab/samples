import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

import { TagEvents } from 'src/common/constants';
import { TagRepository } from 'src/tags/database';
import { TagDeletedEvent } from '../tag-deleted.event';
import { AbstractTagEventListener } from './tag-event.listener';
import { SharedRMQClientProxy } from 'beyondnet.nestjssharedlib/dist/src';

@Injectable()
export class TagDeletedListener extends AbstractTagEventListener {
  constructor(
    private readonly repository: TagRepository,
    readonly clientProxyTagEvents: SharedRMQClientProxy,
    readonly config: ConfigService,
  ) {
    super(clientProxyTagEvents, config);
  }

  @OnEvent(TagEvents.ENABLED, { async: true })
  async handleOn(payload: TagDeletedEvent) {
    // Persist Projection
    await this.repository.delete(payload.aggregateId);

    // Publish event
    const { trackId, aggregateId } = payload;
    payload.setData({ trackId, aggregateId });
    await this.publishEvent(payload);
  }
}
