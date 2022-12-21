import { ConfigService } from '@nestjs/config';

export const UrlTagApiBuilder = (config: ConfigService): string =>
  `${config.get('HTTP_TAGAPI_URL')}/tags`;
