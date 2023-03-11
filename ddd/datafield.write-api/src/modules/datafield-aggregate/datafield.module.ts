import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { mappings } from './application/mapping';
import { commandHandlers, controllers } from './application/use-cases';
import { DddModule } from 'nestjscolab.ddd';
import { DddEsModule } from 'nestjscolab.dddes';
import {
  DataFieldReadRepository,
  DataFieldWriteRepository,
  DataFieldTransactionRepository,
} from './infrastructure/db';
import { sagas } from './infrastructure/sagas';

import { integrationEventHandlers, DATAFIELD_SERVICE } from './application';

import {
  ClientTable,
  DataFieldTable,
  DatapassTable,
  TargetTable,
  ValidatorTable,
} from '../../database';

@Module({
  imports: [
    ConfigModule,
    DddModule,
    DddEsModule.forRoot({
      uri: 'mongodb://127.0.0.1:27017/datafields-eventstore', //TODO: Refactor dddes to add async factory and pass confiservice
    }),
    ClientsModule.registerAsync([
      {
        name: DATAFIELD_SERVICE,
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
    TypeOrmModule.forFeature([
      DataFieldTable,
      ClientTable,
      TargetTable,
      DatapassTable,
      ValidatorTable,
    ]),
  ],
  controllers: [...controllers],
  providers: [
    DataFieldReadRepository,
    DataFieldWriteRepository,
    DataFieldTransactionRepository,
    ...mappings,
    ...commandHandlers,
    ...sagas,
    ...integrationEventHandlers,
  ],
})
export class DatafieldModule {}
