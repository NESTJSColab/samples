import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { TagModule } from './tag/tag.module';

@Module({
  imports: [    
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.SECURITY_THROTTLER_TTL) || 60,
      limit: parseInt(process.env.SECURITY_THROTTLER_LIMIT) || 10,
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.development'] }),
    AutomapperModule.forRoot([
      {
        name: 'classes',
        strategyInitializer: classes(),
      },
    ]
    ),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOAD),
        retryAttempts: parseInt(process.env.DATABASE_RETRY),
        retryDelay: parseInt(process.env.DATABASE_RETRYDELAY),
      }),
    }),
    TagModule,
  ],
})
export class AppModule { }