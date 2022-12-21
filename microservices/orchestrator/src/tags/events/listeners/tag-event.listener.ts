import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

import {
  CommonQueues,
  MessageTagEventsPatterns,
} from '../../../common/constants';
import {
  SharedProxyRmqOptionsBuilder,
  SharedRMQClientProxy,
} from 'beyondnet.nestjssharedlib/dist/src';
import { SharedDomainEvent } from 'beyondnet.nestjssharedlib/dist/src/domain';

@Injectable()
export abstract class AbstractTagEventListener {
  private proxy: ClientProxy;

  constructor(
    readonly clientProxyTagEvents: SharedRMQClientProxy,
    readonly config: ConfigService,
  ) {
    this.proxy = this.clientProxyTagEvents.getProxy(
      SharedProxyRmqOptionsBuilder(this.config, CommonQueues.TagsEventsQueue),
    );
  }

  public async publishEvent(payload: SharedDomainEvent) {
    await this.proxy.send(MessageTagEventsPatterns.CREATE, payload);
  }
}
