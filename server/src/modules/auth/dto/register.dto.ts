import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: 'Name cant be empty' })
  @IsString()
  name!: string;

  @IsNotEmpty({ message: 'Phone number cant be empty' })
  @IsString()
  @Matches(/^(\+62|62|0)[0-9]{9,12}$/, {
    message: 'Phone number have wrong format',
  })
  phone!: string;

  @IsNotEmpty({ message: 'Email cant be empty' })
  @IsEmail({}, { message: 'Invalid email' })
  email!: string;

  @IsNotEmpty({ message: 'Password cant be empty' })
  @IsString()
  @MinLength(6, { message: 'Password at least have 6 character' })
  password!: string;
}
