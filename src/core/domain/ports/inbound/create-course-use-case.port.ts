import CourseDto from '../../entities/course.dto';
import HeaderDto from '../../entities/header.dto';

export interface CreateCourseUseCasePort {
  postCourse(headers: HeaderDto, requestBody: CourseDto);
}
