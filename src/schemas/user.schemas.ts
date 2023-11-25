import { IsEmail, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class UserSchema {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message: 'The password must contain at least 1 lowercase letter, 1 number and 1 special character, and be at least 8 characters long',
  })
  password: string;

  @IsString()
  @IsOptional() 
  confirmPassword: string;
  
  @IsString()
  @MaxLength(255)
  @IsEmail()
  email: string; 
}