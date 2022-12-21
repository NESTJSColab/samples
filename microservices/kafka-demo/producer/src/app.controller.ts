import { Body, Controller, Post } from '@nestjs/common';
import { Demo } from './listeners/demo';
import { MessageListener } from './listeners/MessageListener';

@Controller()
export class AppController {
  constructor(private readonly listener: MessageListener) {}

  @Post()
  async sendMessage(@Body() message: Demo) {
    return await this.listener.handleMessageCompletedEvent(message);
  }
}
