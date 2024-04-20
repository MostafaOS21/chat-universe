import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix setup
  app.setGlobalPrefix('api');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Chat Universe API')
    .setDescription('All the endpoints for the Chat Universe API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Helmet setup
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  // Morgan setup
  app.use(morgan('dev'));

  // Validation setup
  app.useGlobalPipes(new ValidationPipe());

  // Cookie parser setup
  app.use(cookieParser());

  // CORS setup
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
