import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('db.host') || 'localhost',
      port: this.config.get<number>('db.port') || 5432,
      database:
        this.config.get<string>('db.database') || 'datavalidator-datafields',
      username: this.config.get<string>('db.username'),
      password: this.config.get<string>('db.password'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'datafields_migrations_tables',
      logger: 'file',
      synchronize: this.config.get<boolean>('db.synchronize'),
      autoLoadEntities: this.config.get<boolean>('db.autoLoadEntities'),
    };
  }
}
