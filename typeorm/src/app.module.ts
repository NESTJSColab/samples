import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { IdeaModule } from './idea/idea.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true, // disabled in production
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      options: [{ name: 'mapper-classes', pluginInitializer: classes }],
      singular: true,
    }),
    UserModule,
    IdeaModule,
    SharedModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
