import { IsEmail, IsNotEmpty } from 'class-validator';

// DTO para login
export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Password é obrigatória' })
  password: string;
}
