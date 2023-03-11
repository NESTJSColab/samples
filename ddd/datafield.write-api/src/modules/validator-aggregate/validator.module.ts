import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DddModule } from 'nestjscolab.ddd';
import { DddEsModule } from 'nestjscolab.dddes';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValidatorTable } from '../../database';
import {
  ValidatorReadRepository,
  ValidatorTransactionRepository,
  ValidatorWriteRepository,
} from './infrastructure';
import {
  VALIDATOR_SERVICE,
  commandHandlers,
  controllers,
  integrationEventHandlers,
  ValidatorProfileMapping,
} from './application';

@Module({
  imports: [
    ConfigModule,
    DddModule,
    DddEsModule.forRoot({
      uri: 'mongodb://127.0.0.1:27017/datafields-eventstore', //TODO: Refactor dddes to add async factory and pass confiservice
    }),
    TypeOrmModule.forFeature([ValidatorTable]),
    ClientsModule.registerAsync([
      {
        name: VALIDATOR_SERVICE,
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
    ValidatorProfileMapping,
    ValidatorReadRepository,
    ValidatorWriteRepository,
    ValidatorTransactionRepository,
    ...commandHandlers,
    ...integrationEventHandlers,
  ],
})
export class ValidatorModule {}
