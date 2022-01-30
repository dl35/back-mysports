import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiPreconditionFailedResponse, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
async function bootstrap() {
 
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  app.useGlobalPipes( new ValidationPipe(
      {
        transform:true,
        whitelist: true,
        forbidNonWhitelisted:true,
        //errorHttpStatusCode:
      }

  ));






  const config = new DocumentBuilder()
    .setTitle('mySports example')
    .setDescription('The mysports API description')
    .setVersion('1.0')
    .addTag('mysports')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);


}
bootstrap();
