import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    try {
      // Chama o AuthService para criar utilizador
      return await this.authService.register(
        dto.email,
        dto.password,
        dto.username,
        dto.name,
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
      // Valida email/password
      const user = await this.authService.validateUser(dto.email, dto.password);
      if (!user) {
        throw new BadRequestException('Credenciais inválidas');
      }

      // Gera JWT
      return this.authService.login(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
