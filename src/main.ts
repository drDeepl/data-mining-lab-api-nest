import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import SwaggerDocumentBuilder from './swagger/swagger-document-builder';
import { ValidationPipe } from '@nestjs/common';
import { SocketIOAdapter } from './app/adapters/socket-io.adapter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<ConfigService>(ConfigService);

  const swaggerDocumentBuilder = new SwaggerDocumentBuilder(app, configService);
  swaggerDocumentBuilder.setupSwagger();

  app.setGlobalPrefix(process.env.GLOBAL_PREFIX_APP);

  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  await app.listen(3000);
}

bootstrap();
