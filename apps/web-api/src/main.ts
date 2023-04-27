/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { VersioningType } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import * as responseTime from 'response-time';

import { AppModule } from './app/app.module';
import { Logger } from "nestjs-pino";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const logger = app.get<Logger>(Logger)

  app.use(responseTime())
  app.useLogger(logger)

  const port = process.env.PORT || 3333;
  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
