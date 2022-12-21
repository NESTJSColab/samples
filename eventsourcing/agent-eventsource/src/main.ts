import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  CommonQueues,
  GlobalFilters,
  GlobalInterceptors,
} from './common/constants';

const serverRMQ = process.env.RMQ_URL;
const queue = CommonQueues.TagsEventsQueue;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [serverRMQ],
        queue: queue,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  app.useGlobalInterceptors(...GlobalInterceptors);

  app.useGlobalFilters(...GlobalFilters);

  await app.listen();

  console.log(
    `Tags Agent Microservice is listening => Server: ${serverRMQ}, queue: ${queue}`,
  );
}
bootstrap();
