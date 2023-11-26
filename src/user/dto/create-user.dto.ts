import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    name: string

    @ApiProperty({ 
      description: 'Confirmation of the password',
      example: 'John123*',
      minLength: 8,
      maxLength: 20,
    })
    password: string

    @ApiProperty({
      description: 'Confirmation of the password',
      example: 'John123*',
      minLength: 8,
      maxLength: 20,
    })
    confirmPassword: string
    
    @ApiProperty({
      description: 'The email address of the user',
      example: 'john@mail.com',
    })
    email: string
}
