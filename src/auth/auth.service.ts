import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRepository } from '../users/repositories/prisma/prisma-user-repisitory';
import { LoginDto } from 'src/users/dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { validateCreatedUser } from './helpers/validatecreateduser';
import { validateLogin } from './helpers/validatelogin';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

 async validateUser(dto: LoginDto) {
    await validateLogin(dto, this.usersService);
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
    const result = await validateCreatedUser(dto);
    return result;
}
}