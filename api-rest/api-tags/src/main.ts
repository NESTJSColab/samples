import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as csurf from 'csurf';

import { GlobalFilters, GlobalInterceptors } from './common/constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(csurf());

  app.enableCors();
  
  app.useGlobalFilters(...GlobalFilters);

  app.useGlobalInterceptors(...GlobalInterceptors)

  app.useGlobalPipes(buildValidationPipe());
  // this is added here to process Dapr.IO publish with content-header: appliction/cloudevents+json. If not included body of post request will be {}
  // app.use(bodyParser.json({ type: 'application/cloudevents+json' }));
  // add this as other post with content-type: json will fail like login will fail due to bodyPaser code above
  app.use(bodyParser.json());
  
  const port= process.env.PORT || 3001;
  
  await app.listen(port, () => {
    console.log(`TAG API Server is running on port ${port}`);
  });
}
bootstrap();

const buildValidationPipe = (): ValidationPipe => {
  const isDev = process.env.NEST_ENV !== 'production' ? true : false;

  const options: ValidationPipeOptions = {
    disableErrorMessages: isDev,
  };

  return new ValidationPipe(options);
};
