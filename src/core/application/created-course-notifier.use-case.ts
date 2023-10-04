import { Inject, Injectable } from '@nestjs/common';
import { HttpClientPort } from '../domain/ports/outbound/http-client.port';
import GatewayHttpClientConnectorFactory from '../../infra/factories/gateway-http-client.connector.factory';
import { CreatedCourseNotifierUseCasePort } from '../domain/ports/inbound/created-course-notifier-use-case.port';
import { Logger } from 'src/infra/adapters/logging-agent/logging-agent.logger';

@Injectable()
export class CreatedCourseNotifierUseCase
  implements CreatedCourseNotifierUseCasePort
{
  constructor(
    @Inject('HttpClientPort') private httpClientPort: HttpClientPort,
  ) {}

  notifyStudent(requestBody: any) {
    try {
      console.log('Entrou no Consumer');
      console.log(requestBody);
      const httpClientConnectorCourses =
        GatewayHttpClientConnectorFactory.gatewayStudentNotifierConnector();
      this.httpClientPort.post(requestBody, httpClientConnectorCourses);
    } catch (exception) {
      Logger.error(exception.message, {
        stack: exception.stack,
        origin: 'core/application/created-course-notifier.use-case',
      });
    }
  }
}
