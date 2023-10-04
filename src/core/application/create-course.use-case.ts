import { CreateCourseUseCasePort } from '../domain/ports/inbound/create-course-use-case.port';
import { Inject, Injectable } from '@nestjs/common';
import { HttpClientPort } from '../domain/ports/outbound/http-client.port';
import HeaderDto from '../domain/entities/header.dto';
import GatewayHttpClientConnectorFactory from '../../infra/factories/gateway-http-client.connector.factory';
import { plainToInstance } from 'class-transformer';
import { CreatedCourseDto } from '../domain/entities/created-course.dto';
import CourseDto from '../domain/entities/course.dto';
import { KafkaServicePort } from '../domain/ports/outbound/kafka-service.port';
import { Logger } from 'src/infra/adapters/logging-agent/logging-agent.logger';

@Injectable()
export class CreateCourseUseCase implements CreateCourseUseCasePort {
  constructor(
    @Inject('HttpClientPort') private httpClientPort: HttpClientPort,
    @Inject('KafkaServicePort') private kafkaServicePort: KafkaServicePort,
  ) {}

  async postCourse(
    headers: HeaderDto,
    requestBody: CourseDto,
  ): Promise<CreatedCourseDto> {
    try {
      const httpClientConnectorCourses =
        GatewayHttpClientConnectorFactory.gatewayCoursesConnector(headers);
      const response = await this.httpClientPort.post(
        requestBody,
        httpClientConnectorCourses,
      );

      const topic = 'course-topic';
      await this.kafkaServicePort.produceMessage(topic, requestBody);

      return plainToInstance(CreatedCourseDto, response.data);
    } catch (exception) {
      Logger.error(exception.message, {
        stack: exception.stack,
        origin: 'core/application/create-course.use-case',
      });
    }
  }
}
