import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Confirmação da senha do usuário',
    example: 'Senha123*',
    minLength: 8,
    maxLength: 20,
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha do usuário',
    example: 'Senha123*',
    minLength: 8,
    maxLength: 20,
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'O endereço de e-mail do usuário',
    example: 'joao@mail.com',
  })
  email: string;
}
