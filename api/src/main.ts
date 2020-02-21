import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/exception-filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: { origin: '*', methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']}});
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
