import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The name or email is used for login. A secure comparison will be made between the provided name/email and the registered one in the database for the operation.',
    example: 'john@mail.com'
  })
  email: string;

  @ApiProperty({
    description: 'The password is used for login. A secure comparison will be made between the provided password and the one registered with the same email or name in the database to proceed with the operation.',
    example: 'John123*'
  })
  password: string;
}
