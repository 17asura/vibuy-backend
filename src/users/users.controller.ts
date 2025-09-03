import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users') // Endpoint base: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // GET /users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  @UseGuards(AuthGuard('jwt')) // 👈 Protege a rota
  findOne(@Param('id') id: string, @Request() req) {
    // Verifica se o usuário logado está tentando acessar seus próprios dados
    if (req.user.id !== id) {
      throw new ForbiddenException('Você só pode acessar seus próprios dados');
    }
    
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    if (req.user.id !== id) {
      throw new ForbiddenException('Você só pode atualizar seus próprios dados');
    }
    
    return this.usersService.update(id, updateUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}
