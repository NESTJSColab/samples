import { Demo } from './demo';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MessageListener {
  constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

  @OnEvent('message')
  async handleMessageCompletedEvent(event: Demo) {
    await this.client.emit('default', Demo);
  }
}
