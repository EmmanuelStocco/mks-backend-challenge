import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The user name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User password confirmation',
    example: 'John123*',
    minLength: 8,
    maxLength: 20,
  })
  password: string;

  @ApiProperty({
    description: 'User password confirmation',
    example: 'John123*',
    minLength: 8,
    maxLength: 20,
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'The user email address',
    example: 'john@mail.com',
  })
  email: string;
}
