import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsModule } from './events/events.module';

@Module({
  imports: [
    EventsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: process.env.DB_EVENTS_HOST,
        port: parseInt(process.env.DB_EVENTS_PORT) || 5432,
        username: process.env.DB_EVENTS_USER,
        password: process.env.DB_EVENTS_PASSWORD,
        DB_EVENTS: process.env.DB_EVENTS_NAME,
        autoLoadEntities: Boolean(process.env.DB_EVENTS_AUTOLOAD),
        retryAttempts: parseInt(process.env.DB_EVENTS_RETRY),
        retryDelay: parseInt(process.env.DB_EVENTS_RETRYDELAY),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
