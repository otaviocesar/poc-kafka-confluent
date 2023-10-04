import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { validate, ValidationError } from 'class-validator';
import HeaderDto from '../../core/domain/entities/header.dto';

@Injectable()
export class ValidadeClientCredentialsFlowHeaderInterceptor
  implements NestInterceptor
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<string>> {
    const headers = context.switchToHttp().getRequest().headers;
    const dto = new HeaderDto(headers.authorization);
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(
        `Validation failed: ${this.formatErrors(errors)}`,
      );
    }
    return next.handle();
  }

  private formatErrors(errors: ValidationError[]): string {
    return errors
      .map((error) => {
        for (const key in error.constraints) {
          return error.constraints[key];
        }
        return '';
      })
      .join(', ');
  }
}
