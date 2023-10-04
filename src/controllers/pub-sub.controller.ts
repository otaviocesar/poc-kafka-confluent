import {
  Controller,
  HttpStatus,
  HttpCode,
  Headers,
  Inject,
  Post,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBasicAuth,
} from '@nestjs/swagger';
import { CreateCourseUseCasePort } from '../core/domain/ports/inbound/create-course-use-case.port';
import { CreatedCourseDto } from '../core/domain/entities/created-course.dto';
import ResponseErrorDto from '../core/domain/entities/response-error.dto';
import HeaderDto from '../core/domain/entities/header.dto';
import { ValidadeClientCredentialsFlowHeaderInterceptor } from '../infra/interceptors/validade-client-credentials-flow-header.interceptor';
import CourseDto from '../core/domain/entities/course.dto';

@ApiTags('cursos')
@Controller('cursos')
@UseInterceptors(ValidadeClientCredentialsFlowHeaderInterceptor)
export class PubSubController {
  constructor(
    @Inject('CreateCourseUseCasePort')
    private createCourseUseCasePort: CreateCourseUseCasePort,
  ) {}

  @ApiOperation({
    summary: 'PUB SUB API',
  })
  @ApiOkResponse({
    description: 'Success.',
    type: CreatedCourseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
    type: ResponseErrorDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.', type: ResponseErrorDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
    type: ResponseErrorDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error.',
    type: ResponseErrorDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBasicAuth()
  @Post()
  async postCourses(
    @Headers() headers: HeaderDto,
    @Body() requestBody: CourseDto,
  ): Promise<CreatedCourseDto> {
    return this.createCourseUseCasePort.postCourse(headers, requestBody);
  }
}
