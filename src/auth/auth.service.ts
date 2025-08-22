import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Valida se o utilizador existe e se a password está correta
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findAll().then(users =>
      users.find(u => u.email === email),
    );

    if (!user) throw new UnauthorizedException('Email não encontrado');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Password incorreta');

    return user;
  }

  // Faz login e gera token JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Faz registo e encripta password
  async register(email: string, password: string, username: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      email,
      password: hashedPassword,
      username,
      name,
    });
  }
}
