import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Criar utilizador
  async create(data: CreateUserDto) {
    // Podes adicionar hash da password aqui se necessário
    return this.prisma.user.create({ data });
  }

  // Listar todos os utilizadores (não retorna passwords)
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        // adiciona outros campos públicos que queres expor
      },
    });
  }

  // Buscar utilizador por ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        // evita retornar password
      },
    });
  }

  // Buscar utilizador pelo email (necessário para login)
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Atualizar utilizador
  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  // Apagar utilizador
  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}