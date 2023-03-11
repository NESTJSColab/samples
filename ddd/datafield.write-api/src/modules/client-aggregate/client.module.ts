import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DddModule } from 'nestjscolab.ddd';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ClientProfileMapping } from './application/mapping';
import { CLIENT_SERVICE } from './application/integration-events/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientTable, DatapassTable, TargetTable } from '../../database';
import {
  ClientReadRepository,
  ClientTransactionRepository,
  ClientWriteRepository,
} from './infrastructure/db';
import { commandHandlers, controllers } from './application/use-cases';
import { integrationEventHandlers } from './application/integration-events';
import { DddEsModule } from 'nestjscolab.dddes';

@Module({
  imports: [
    ConfigModule,
    DddModule,
    DddEsModule.forRoot({
      uri: 'mongodb://127.0.0.1:27017/datafields-eventstore', //TODO: Refactor dddes to add async factory and pass confiservice
    }),
    TypeOrmModule.forFeature([ClientTable, DatapassTable, TargetTable]),
    ClientsModule.registerAsync([
      {
        name: CLIENT_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${configService.getOrThrow('broker.rabbitmq.urls')}`],
            queue: `${configService.getOrThrow('broker.rabbitmq.queue')}`,
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [...controllers],
  providers: [
    ClientProfileMapping,
    ClientReadRepository,
    ClientWriteRepository,
    ClientTransactionRepository,
    ...commandHandlers,
    ...integrationEventHandlers,
  ],
})
export class ClientModule {}
