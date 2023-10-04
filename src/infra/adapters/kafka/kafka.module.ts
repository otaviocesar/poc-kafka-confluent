import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'kafka_client',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'client_id',
            brokers: ['kafka:29092'],
          },
          consumer: {
            groupId: 'group_client_consumer',
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: 'KafkaServicePort',
      useClass: KafkaService,
    },
    {
      provide: 'notifications',
      useFactory: (kafkaClient: ClientKafka) => kafkaClient,
      inject: ['kafka_client'],
    },
  ],
  exports: ['KafkaServicePort'],
})
export class KafkaServiceModule {}
