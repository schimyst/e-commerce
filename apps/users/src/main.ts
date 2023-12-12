import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const configService = app.get(ConfigService);

  const RABBITMQ_USER = configService.get('RABBITMQ_USER');
  const RABBITMQ_PASSWORD = configService.get('RABBITMQ_PASSWORD');
  const RABBITMQ_HOST = configService.get('RABBITMQ_HOST');
  const RABBITMQ_USERS_QUEUE = configService.get('RABBITMQ_USERS_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}`],
      noAck: false,
      queue: RABBITMQ_USERS_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
