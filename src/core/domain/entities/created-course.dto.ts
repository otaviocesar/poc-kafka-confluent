import { ApiProperty } from '@nestjs/swagger';

export class CreatedCourseDto {
  @ApiProperty({
    type: String,
    example: 'id',
    description: 'id',
  })
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
