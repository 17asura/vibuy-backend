// Módulo raiz da aplicação
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule, // Módulo de autenticação
    UsersModule, // Módulo de utilizadores
  ],
  providers: [PrismaService], // Disponibiliza Prisma globalmente
  exports: [PrismaService],
})
export class AppModule {}
