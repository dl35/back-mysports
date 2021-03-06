import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { AppModule } from './app.module';
async function bootstrap() {
 
  const app = await NestFactory.create(AppModule, {
    //  logger: ['log', 'error', 'warn', 'debug', 'verbose']
  });
  app.enableCors();
  app.use(compression());


  //  pour le protocle ws ( websocket)
  //  app.useWebSocketAdapter(new WsAdapter(app));

  app.useGlobalPipes( new ValidationPipe(
      {
        transform:true,
        forbidNonWhitelisted:true,
        //errorHttpStatusCode:
      }

  ));






  const config = new DocumentBuilder()
    .setTitle('mySports example')
    .setDescription('The mysports API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header'
       },
      'JWT-auth',
    )
    .addTag('mysports')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');


}
bootstrap();


