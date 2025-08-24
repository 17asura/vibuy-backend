import { IsBoolean, IsEmail, IsString, MinLength, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsBoolean()
  email_verify: boolean;

  @IsBoolean()
  terms_verify: boolean;

  @IsString()
  @IsNotEmpty({ message: 'Nome não pode estar vazio' }) // garante que não é string vazia ou undefined
  name: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/, { 
  message: 'Password must include uppercase, lowercase, number, and special character'
  })
  hashed_password: string;

  @IsString()
  createdAt: string;
}
