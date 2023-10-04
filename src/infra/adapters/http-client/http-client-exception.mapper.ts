import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';

export class HttpClientExceptionMapper {
  public static mapErrorToException(error: AxiosError) {
    const responseData: unknown = error?.response?.data;
    if (
      responseData &&
      typeof responseData === 'object' &&
      'error' in responseData
    ) {
      switch (error.response.status) {
        case 401:
          return new UnauthorizedException(responseData.error);
        case 403:
          return new ForbiddenException(responseData.error);
        default:
          return new BadRequestException(responseData.error);
      }
    } else {
      return new InternalServerErrorException(
        'HttpClient communication failure',
      );
    }
  }
}
