import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Windows Explorer - Test Infokes')
    .setDescription('Windows Explorer API description')
    .setVersion('1.0')
    .addTag('test-infokes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 8001, '0.0.0.0');
}
bootstrap();
