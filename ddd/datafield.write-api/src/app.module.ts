import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ThrottlerModule } from '@nestjs/throttler';

import configuration from './config/configuration';
import { SharedModule } from './shared/shared.module';
import { PinoLoggerHelper } from './shared/helpers';
import { ThrottlerHelper } from './shared/helpers/throttler.helper';
import {
  ClientTable,
  DataFieldTable,
  DatapassTable,
  TargetTable,
  TypeOrmConfigService,
  ValidatorTable,
} from './database';

// import { TargetModule } from './modules/pending/target/target.module';

import { ClientModule } from './modules/client-aggregate/client.module';
import { DatabaseModule } from './database/database.module';
import { DatafieldModule } from './modules/datafield-aggregate/datafield.module';
import { ValidatorModule } from './modules/validator-aggregate/validator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    // RouterModule.forRoutes(routes),
    ThrottlerModule.forRootAsync(ThrottlerHelper.config()),
    LoggerModule.forRootAsync(PinoLoggerHelper.config()),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([
      ClientTable,
      TargetTable,
      DatapassTable,
      ValidatorTable,
      DataFieldTable,
    ]),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    SharedModule,
    DatabaseModule,
    DatafieldModule,
    ValidatorModule,
    ClientModule,
  ],
})
export class AppModule {}
