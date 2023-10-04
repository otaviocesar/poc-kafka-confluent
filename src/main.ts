import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PubSubModule } from './pub-sub.module';
import { PORT } from './infra/environments';
import { HttpExceptionFilter } from './infra/exceptions/http-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrapAPI() {
  const app = await NestFactory.create(PubSubModule);

  const config = new DocumentBuilder()
    .setTitle('PubSub')
    .setDescription('POC Confluent Cloud Service')
    .setVersion('1.0.0')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
}

async function bootstrapMicroservice() {
  const consumerMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(PubSubModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:29092'],
        },
      },
    });
  await consumerMicroservice.listen();
}
bootstrapAPI();
bootstrapMicroservice();
