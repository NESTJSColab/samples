import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(`NESTJS Express Sample`)
    .setDescription(`Sample using express with NESTJS`)
    .setVersion('1.0')
    .addTag('Tags')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log(`Express API is running on: ${await app.getUrl()}`);
}
bootstrap();

/*
min - the shortest time the step has taken
max - the longest time the step has taken
avg - the average time for the test step
last - the last time for the test step
cnt - the number of times the test step has been executed
tps - the number of transactions per second for the test step
bytes - the number of bytes processed by the test step
bps - the bytes per second processed by the test step
*/
