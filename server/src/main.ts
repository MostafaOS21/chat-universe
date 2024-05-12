import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix setup
  app.setGlobalPrefix('api');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Chat Universe API')
    .setDescription('All the endpoints for the Chat Universe API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'apiKey', in: 'header', name: 'Authorization' },
      'Bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // CORS setup
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validation setup
  app.useGlobalPipes(new ValidationPipe());

  // Cookie parser setup
  app.use(cookieParser());

  // Session setup
  app.use(
    session({
      secret: `${process.env.COOKIE_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: isNaN(+process.env.JWT_COOKIE_EXPIRE)
          ? 604800000
          : +process.env.JWT_COOKIE_EXPIRE,
      },
    }),
  );

  // Helmet setup
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  // Morgan setup
  app.use(morgan('dev'));

  // Passport setup
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8000);
}
bootstrap();
