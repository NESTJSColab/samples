import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MessageNotificationPatterns } from 'src/common/contants';
import { EventsService } from './events.service';
import { CreateMessageDto } from './application/dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private service: EventsService) {}

  @SubscribeMessage(MessageNotificationPatterns.EVENTS)
  async onEvent(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateMessageDto,
  ): Promise<void> {
    await this.service.insert(payload);

    client.emit(MessageNotificationPatterns.EVENTS, payload);
  }
}
