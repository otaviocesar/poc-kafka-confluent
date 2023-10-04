import { Module } from '@nestjs/common';

import { PubSubController } from './controllers/pub-sub.controller';
import { CreateCourseUseCase } from './core/application/create-course.use-case';

import { InfraModule } from './infra/infra.module';
import { ConsumerController } from './controllers/consumer.controller';
import { CreatedCourseNotifierUseCase } from './core/application/created-course-notifier.use-case';

@Module({
  imports: [InfraModule],
  controllers: [PubSubController, ConsumerController],
  providers: [
    {
      provide: 'CreateCourseUseCasePort',
      useClass: CreateCourseUseCase,
    },
    {
      provide: 'CreatedCourseNotifierUseCasePort',
      useClass: CreatedCourseNotifierUseCase,
    },
  ],
  exports: [PubSubModule],
})
export class PubSubModule {}
