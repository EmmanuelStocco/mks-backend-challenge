import { ApiProperty } from '@nestjs/swagger'; 

export class User {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  }) 
  name: string; 
}
