import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class AppController {
  constructor() {
    // Not implemented
  }

  @MessagePattern('default')
  async orderCompletedEvent(@Payload() message: KafkaMessage): Promise<void> {
    console.log(message.value);
  }
}
