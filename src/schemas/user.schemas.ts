import { IsEmail, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class UserSchema {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'John Doe',
  })
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'Senha123*',
  })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message: 'The password must contain at least 1 lowercase letter, 1 number and 1 special character, and be at least 8 characters long',
  })
  password: string;

  @ApiProperty({
    description: 'A senha confirmada do usuário. Este campo é usado para confirmar a senha fornecida pelo usuário para fins de verificação',
    example: 'Senha123*',
  })
  @IsString()
  @IsOptional() 
  confirmPassword: string;
  
  @ApiProperty({
    description: 'O endereço de e-mail do usuário',
    example: 'john@example.com',
  })
  @IsString()
  @MaxLength(255)
  @IsEmail()
  email: string; 
}