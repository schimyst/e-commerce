import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'USERS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const RABBITMQ_USER = configService.get('RABBITMQ_USER');
        const RABBITMQ_PASSWORD = configService.get('RABBITMQ_PASSWORD');
        const RABBITMQ_HOST = configService.get('RABBITMQ_HOST');
        const RABBITMQ_USERS_QUEUE = configService.get('RABBITMQ_USERS_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}`,
            ],
            queue: RABBITMQ_USERS_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
