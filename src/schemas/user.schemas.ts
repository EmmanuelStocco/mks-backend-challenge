import { IsEmail, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class UserSchema {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Senha123*',
  })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message: 'The password must contain at least 1 lowercase letter, 1 number and 1 special character, and be at least 8 characters long',
  })
  password: string;

  @ApiProperty({
    description: 'The confirmed password of the user. This field is used to confirm the user-provided password for verification purposes.',
    example: 'Senha123*',
  })
  @IsString()
  @IsOptional() 
  confirmPassword: string;
  
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john@example.com',
  })
  @IsString()
  @MaxLength(255)
  @IsEmail()
  email: string; 
}