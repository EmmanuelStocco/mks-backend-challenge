import { ApiProperty } from '@nestjs/swagger'; 

export class UserSchema {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  }) 
  name: string; 
}
