import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'O nome ou e-mail é usado para login. Será feita uma comparação segura entre o nome/e-mail fornecido e o registrado no banco de dados para a operação.',
    example: 'john@mail.com'
  })
  email: string;

  @ApiProperty({
    description: 'A senha é usada para login. Será feita uma comparação segura entre a senha fornecida e aquela registrada com o mesmo e-mail ou nome no banco de dados para prosseguir com a operação.',
    example: 'John123*'
  })
  password: string;
}
