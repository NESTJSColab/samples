import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { MessageListener } from './listeners/MessageListener';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
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
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [MessageListener],
})
export class AppModule {}
