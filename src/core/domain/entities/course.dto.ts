import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CourseDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Engenharia da Computação',
    description: 'curso',
  })
  public nome: string;
}
