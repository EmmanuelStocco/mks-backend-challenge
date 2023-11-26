import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe());

  
  const config = new DocumentBuilder()
    .setTitle('Documentação - Desafio Backend Challenge')
    .setDescription(
      'Aqui você consegue visualizar e testar diretamente o funcionamento de cada rota da Rest API.',
    )
    .setVersion('1.0')
    .addTag('user')
    .build();  
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);


  await app.listen(3000); //docker build
}
bootstrap();
