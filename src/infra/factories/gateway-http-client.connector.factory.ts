import HttpClientConnector from '../adapters/http-client/http-client.connector';
import { GATEWAY_URL } from '../environments/index';
import { AUTHORIZATION } from '../environments/index';
import HeaderDto from '../../core/domain/entities/header.dto';

export default class GatewayHttpClientConnectorFactory {
  static gatewayCoursesConnector(headers: HeaderDto): HttpClientConnector {
    const httpClientConnector = new HttpClientConnector();

    const clientCredentialsHeaders = {
      'Content-Type': 'application/json',
      Authorization: headers?.authorization,
    };

    httpClientConnector.setDomain(GATEWAY_URL);
    httpClientConnector.setApi('ead/v1');
    httpClientConnector.setResource('cursos');
    httpClientConnector.setHeaders(clientCredentialsHeaders);
    return httpClientConnector;
  }

  static gatewayStudentNotifierConnector(): HttpClientConnector {
    const httpClientConnector = new HttpClientConnector();

    const clientCredentialsHeaders = {
      'Content-Type': 'application/json',
      Authorization: AUTHORIZATION,
    };

    httpClientConnector.setDomain(GATEWAY_URL);
    httpClientConnector.setApi('ead/v1');
    httpClientConnector.setResource('notificacoes/alunos');
    httpClientConnector.setHeaders(clientCredentialsHeaders);
    return httpClientConnector;
  }
}
