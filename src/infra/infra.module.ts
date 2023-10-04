import { Module } from '@nestjs/common';
import { HttpClientModule } from './adapters/http-client/http-client.module';
import { KafkaServiceModule } from './adapters/kafka/kafka.module';

@Module({
  imports: [HttpClientModule, KafkaServiceModule],
  exports: [HttpClientModule, KafkaServiceModule],
})
export class InfraModule {}
