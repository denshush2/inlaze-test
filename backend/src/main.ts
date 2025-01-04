import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeORMExceptionFilter } from './common/exceptions/typeorm.exception';
import { ValidationPipe } from '@nestjs/common';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TypeORMExceptionFilter());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
