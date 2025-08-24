import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../users/dto/login.dto';

export async function validateLogin(usersService: UsersService, dto: LoginDto) {
  const { email, password } = dto;

  // Busca o utilizador pelo email (melhor usar findByEmail se existir)
  const user = await usersService.findAll().then(users => users.find(u => u.email === email));

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
