import { ConfigService } from '@nestjs/config';

export class UrlPathBuilder {
  static buildGlobalPrefix(config: ConfigService): string {
    return `/${config.getOrThrow<string>(
      'apiPrefix',
    )}/${config.getOrThrow<string>('api.version')}/`;
  }

  static buildFullPath(config: ConfigService): string {
    return `${config.getOrThrow<string>('baseUrl')}:${config.getOrThrow<number>(
      'port',
    )}/${config.getOrThrow<string>('apiPrefix')}/${config.getOrThrow<string>(
      'api.version',
    )}`;
  }
}
