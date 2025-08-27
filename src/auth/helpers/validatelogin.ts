import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../users/dto/login.dto';
import { UsersService } from '../../users/users.service';

export async function validateLogin(dto: LoginDto, usersService: UsersService) {
  const { email, password } = dto;

  const user = await usersService.findByEmail(email);
  if (!user) {
    throw new UnauthorizedException('Email não encontrado');
  }

  const valid = await bcrypt.compare(password, user.hashed_password);
  if (!valid) {
    throw new UnauthorizedException('Password incorreta');
  }

  return user;
}
