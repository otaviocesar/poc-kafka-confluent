import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class HeaderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Basic dXNlcjpwYXNzd29yZA==',
    description:
      'Basic prefix followed by a space and a Base64-encoded credential',
  })
  public authorization: string;

  constructor(authorization: string) {
    this.authorization = authorization;
  }
}
