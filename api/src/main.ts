import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AuthenticatedSocketIoAdapter } from './AuthenticatedSocketIoAdapter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  // validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // enable cors
  app.enableCors({
    origin: configService.get("FRONT_HOST"),
    credentials: true,
  });

  // swagger
  const config = new DocumentBuilder()
    .setTitle('npp API')
    .setDescription('NestJs Prisma Postgresql Template')
    .setVersion('1.0')
    .addTag('devices')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.use(cookieParser());
  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));
  await app.listen(3333);
}

bootstrap();
