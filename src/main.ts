import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './infra/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Car Rental Management, PRIME NODE')
    .setDescription(
      'This project brings the API back-end of a car rental management',
    )
    .setVersion('1.0')
    .addTag('Api Car')
    .setContact(
      'Team: Diogo Vasconcelos, Rafael Arashiro, Marcelo Jose de Sousa, Leticia Alaide, Vitor Zoqueti',
      'https://github.com/DioGolang/ANOUT24_D02_COMPASSCAR_PRIME_NODE',
      'support@example.com',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const seedService = app.get(SeedService);
  await seedService.createUser();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
