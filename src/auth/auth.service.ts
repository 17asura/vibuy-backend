import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaUserRepository } from '../users/repositories/prisma/prisma-user-repisitory';
import { LoginDto } from 'src/users/dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { validateCreatedUser } from './helpers/validatecreateduser';
import { validateLogin } from './helpers/validatelogin';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Faz login e gera token JWT
 async login(dto: LoginDto) {
    const token = await validateLogin(dto, this.usersService, this.jwtService);
    return token;
  }

  // Faz registo e encripta password
async register(dto: CreateUserDto) {
    // Validação do DTO
    const result = await validateCreatedUser(dto);
    return result;
}
}