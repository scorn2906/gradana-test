import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password!: string;
}
