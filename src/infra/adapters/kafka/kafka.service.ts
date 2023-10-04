import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(@Inject('notifications') private readonly client: ClientKafka) {}

  async produceMessage(topic: string, message: any): Promise<any> {
    try {
      return this.client.emit(topic, message);
    } catch (exception) {
      Logger.error(exception.message, {
        stack: exception.stack,
        origin: 'infra/adapters/kafka/kafka.service',
      });
    }
  }
}
