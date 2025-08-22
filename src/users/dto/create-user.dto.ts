import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email inválido' }) 
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password muito pequena, mínimo 6 caracteres' })
  password: string;

  @IsString()
  name: string;
}
