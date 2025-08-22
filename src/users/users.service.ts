import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Criar utilizador
  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  // Listar todos os utilizadores
  async findAll() {
    return this.prisma.user.findMany();
  }

  // Buscar utilizador por ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
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
