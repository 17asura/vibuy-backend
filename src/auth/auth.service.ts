import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRepository } from '../users/repositories/prisma/prisma-user-repisitory';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { validateCreatedUser } from './helpers/validatecreateduser';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Valida se o utilizador existe e se a password está correta
  async validateUser(email: string, hashed_password: string) {
    const user = await this.usersService.findAll().then(users =>
      users.find(u => u.email === email),
    );

    if (!user) throw new UnauthorizedException('Email não encontrado');

    const valid = await bcrypt.compare(hashed_password, user.hashed_password);
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
async register(dto: CreateUserDto) {
    // Validação do DTO
    await validateCreatedUser(dto);

    // Hash da password
    const hashPassword = await bcrypt.hash(dto.hashed_password, 10);

    // Criação do utilizador
    const user = await new PrismaUserRepository().create({
        email: dto.email,
        email_verify: dto.email_verify,
        terms_verify: dto.terms_verify,
        hashed_password: hashPassword,
        name: dto.name
    });

    return user;
}
}