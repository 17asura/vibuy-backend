import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    try {
      // Chama o AuthService para criar utilizador
      return await this.authService.register(
        dto
      );
    } catch (error) {
      // Retorna mensagem amigável para o frontend
      throw new BadRequestException(error.message);
    }
  }

  // POST /auth/login
  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      // Chama o AuthService para logar o utilizador
      return await this.authService.login(
        dto
      );
    } catch (error) {
      // Retorna mensagem amigável para o frontend
      throw new BadRequestException(error.message);
    }
  }
}
