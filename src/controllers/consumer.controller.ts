import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatedCourseNotifierUseCasePort } from 'src/core/domain/ports/inbound/created-course-notifier-use-case.port';

@Controller('consumer')
export class ConsumerController {
  constructor(
    @Inject('CreatedCourseNotifierUseCasePort')
    private createdCourseNotifierUseCasePort: CreatedCourseNotifierUseCasePort,
  ) {}
  @MessagePattern('course-topic')
  handler(@Payload() message: any) {
    console.log(message);
    this.createdCourseNotifierUseCasePort.notifyStudent(message);
  }
}
