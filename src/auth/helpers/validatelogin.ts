import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../users/dto/login.dto';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';

export async function validateLogin(
  dto: LoginDto,
  usersService: UsersService,
  jwtService: JwtService, // passamos o JwtService
) {
  const { email, password } = dto;
  const email_lowercase = email.toLowerCase();
  const user = await usersService.findByEmail(email_lowercase);
  if (!user) {
    throw new UnauthorizedException('Password ou e-mail incorreto');
  }

  const valid = await bcrypt.compare(password, user.hashed_password);
  if (!valid) {
    throw new UnauthorizedException('Password ou e-mail incorreto');
  }

  // Cria o payload do token
  const payload = { email: email_lowercase, id: user.id };

  return {
    access_token: jwtService.sign(payload), // usamos o jwtService passado
  };
}
