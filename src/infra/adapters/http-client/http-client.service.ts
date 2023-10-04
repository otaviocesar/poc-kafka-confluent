import { AxiosResponse } from 'axios';
import { HttpClientPort } from '../../../core/domain/ports/outbound/http-client.port';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import HttpClientConnector from './http-client.connector';
import { firstValueFrom } from 'rxjs';
import { HttpClientExceptionMapper } from './http-client-exception.mapper';
import { Logger } from '../logging-agent/logging-agent.logger';

@Injectable()
export class HttpClient implements HttpClientPort {
  constructor(private httpService: HttpService) {}

  public async post(
    body: URLSearchParams | object,
    httpClientConnector: HttpClientConnector,
  ): Promise<AxiosResponse> {
    try {
      Logger.log(`HTTP POST`, {
        origin: 'infra/adapter/http-client/http-client.service',
        instance: `${httpClientConnector.getURI()}`,
      });
      const response = await firstValueFrom(
        this.httpService.post(httpClientConnector.getURI(), body, {
          headers: httpClientConnector.getHeaders(),
        }),
      );
      return response;
    } catch (error) {
      Logger.error(error?.response?.data?.error, {
        origin: 'infra/adapter/http-client/http-client.service',
        stack: error,
        instance: `${httpClientConnector.getURI()}`,
      });
      throw HttpClientExceptionMapper.mapErrorToException(error);
    }
  }
}
