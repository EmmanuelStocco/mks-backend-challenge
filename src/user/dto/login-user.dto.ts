import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @ApiProperty({
    description: 'O nome ou e-mail é utilizado para realizar o login. Será feita uma comparação segura entre o nome/e-mail enviado é o registrado no banco de dados para a operação.',
    example: 'joao@email.com'
  })
  emailOrName: string

  @ApiProperty({
    description: 'A senha é utilizado para realizar o login. Será feita uma comparação segura entre a senha enviada e a registrada com mesmo e-mail ou nome no banco de dados para prosseguir a operação.',
    example: 'João123*'
  })
  password: string
}
