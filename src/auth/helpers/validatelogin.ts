import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../users/dto/login.dto';

export async function validateLogin(dto: LoginDto) {
  const { email, password } = dto;

  // Busca o utilizador pelo email (melhor usar findByEmail se existir)
  const user = await this.usersService.findByEmail(email);

  if (!user) {
    throw new UnauthorizedException('Email não encontrado');
  }

  // Compara a password enviada com o hash armazenado
  const valid = await bcrypt.compare(password, user.hashed_password);
  if (!valid) {
    throw new UnauthorizedException('Password incorreta');
  }

  return user;
}
