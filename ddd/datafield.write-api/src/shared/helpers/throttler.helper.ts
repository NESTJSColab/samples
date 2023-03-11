import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions } from '@nestjs/throttler';

export class ThrottlerHelper {
  static config(): ThrottlerAsyncOptions {
    return {
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        ttl: config.get<number>('ttl'),
        limit: config.get<number>('ttl_limit'),
      }),
      inject: [ConfigService],
    };
  }
}
