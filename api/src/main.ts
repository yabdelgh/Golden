import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AuthenticatedSocketIoAdapter } from './AuthenticatedSocketIoAdapter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));
  // setup validation
  app.useGlobalPipes(new ValidationPipe());
  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('ft_transcendence API')
    .setDescription('NestJs Prisma Postgresql Template')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3333);
}

bootstrap();
