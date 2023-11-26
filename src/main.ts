import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentation - Backend Challenge')
    .setDescription(
      'Here, you can view and directly test the functionality of each route of the RESTful API.',
    )
    .setContact(
      'Emmanuel Stocco',
      'https://github.com/emmanuelstocco',
      'emmanuelrolimstocco@gmail.com',
    )
    .setVersion('2.0')
    .addTag('user')
    .addTag('movies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);

  await app.listen(3000); //docker build
}
bootstrap();
