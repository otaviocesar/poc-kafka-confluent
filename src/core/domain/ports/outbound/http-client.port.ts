import { AxiosResponse } from 'axios';
import HttpClientConnector from '../../../../infra/adapters/http-client/http-client.connector';
export interface HttpClientPort {
  post(body: any, httpClient: HttpClientConnector): Promise<AxiosResponse>;
}
