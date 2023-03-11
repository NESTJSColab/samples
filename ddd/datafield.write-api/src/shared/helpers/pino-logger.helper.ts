import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModuleAsyncParams } from 'nestjs-pino';

export class PinoLoggerHelper {
  static config(): LoggerModuleAsyncParams {
    return {
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        pinoHttp: {
          level: config.get<string>('logger.level'),
          name: config.get<string>('logger.name'),
          transport: config.get<any>('logger.transport'),
        },
      }),
      inject: [ConfigService],
    };
  }
}
