import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import dns from 'node:dns';

async function bootstrap() {
  dns.setDefaultResultOrder('ipv4first');
  const app = await NestFactory.create(AppModule);
  // Increase payload limits for large forms/photos
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  
  app.useGlobalPipes(new ValidationPipe());
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Adhyayan API')
    .setDescription('The Adhyayan API documentation')
    .setVersion('1.0')
    .addTag('Adhyayan')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://adhyayan-backend-0eak.onrender.com',
      'https://adhyayan-trial.netlify.app',
      'https://app.adhyayanedu.in',
      'http://3.108.123.149',
      'https://webinar.gg',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });
  await app.listen(process.env.PORT ?? 3002);
}
void bootstrap();
