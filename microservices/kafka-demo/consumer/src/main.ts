import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092'],
          ssl: true,
          sasl: {
            mechanism: 'plain',
            username: '742EFTARWRKCWOMD',
            password:
              'rUPG6Lomz/dPcb1oRAm9JVP+rY3MWlg17ObwmTUFNmSF/i7ygKvWacy6PMHluCUW',
          },
        },
        consumer: {
          groupId: process.env.GROUP_ID,
        },
      },
    },
  );
  app.listen(() => console.log('app is listening...'));
}
bootstrap();
