git import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AuthenticatedSocketIoAdapter } from './AuthenticatedSocketIoAdapter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // setup cors
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));
  await app.listen(3333);
}

bootstrap();
