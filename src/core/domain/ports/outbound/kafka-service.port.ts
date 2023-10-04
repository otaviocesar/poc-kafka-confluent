export interface KafkaServicePort {
  produceMessage(topic: string, body: any): Promise<void>;
}
