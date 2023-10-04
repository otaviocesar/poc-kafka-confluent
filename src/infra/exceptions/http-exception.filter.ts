import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../adapters/logging-agent/logging-agent.logger';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionString = JSON.stringify(exception);

    const { message, status } = this.isBusinessException(
      exception,
      exceptionString,
    );

    response.status(status).json({
      message: message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  public isBusinessException(
    exception: HttpException,
    exceptionString: string,
  ): ExceptionFilterData {
    Logger.error(exceptionString, {
      stack: exception.stack,
      origin: 'infra/exceptions/http-exception.filter',
    });
    const exceptionJson = JSON.parse(exceptionString);
    return {
      message: exceptionJson?.response?.message,
      status: exceptionJson?.response?.statusCode,
    };
  }
}

interface ExceptionFilterData {
  message: string;
  status: number;
}
