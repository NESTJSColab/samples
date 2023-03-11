import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { UrlPathBuilder } from './shared/builders';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config: ConfigService = app.get(ConfigService);

  console.log(config);

  registerMiddlewares(app, config);

  registerOpenApi(app, config);

  await app.listen(config.get<number>('port'), () => {
    console.log(
      '[DATA VALIDATOR SETUP API]:',
      UrlPathBuilder.buildFullPath(config),
    );
  });
}
bootstrap();

export const registerOpenApi = (
  app: NestExpressApplication,
  config: ConfigService,
) => {
  const options = new DocumentBuilder()
    .setTitle('DataFields Setup-API')
    .setDescription('API service for DataValidator datafields CRUD management')
    .setVersion(`${config.get<string>('api.version')}.0.0`)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};

export const registerMiddlewares = (
  app: NestExpressApplication,
  config: ConfigService,
) => {
  app.use(helmet());

  app.use(compression());

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(UrlPathBuilder.buildGlobalPrefix(config));

  // Enables you to keep using the built-in NestJS logger (except Pino is now the logger behind the scenes)
  app.useLogger(app.get(Logger));

  app.enableShutdownHooks();
};
