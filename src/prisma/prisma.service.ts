// Importa as ferramentas necessárias do NestJS e do Prisma Client
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable() // Permite que este service seja "injetado" noutros módulos
export class PrismaService
  extends PrismaClient // Extende o PrismaClient gerado pelo Prisma
  implements OnModuleInit, OnModuleDestroy // Implementa ciclos de vida do módulo NestJS
{
  // Função que corre quando o módulo é inicializado
  async onModuleInit() {
    await this.$connect(); // Liga à base de dados
    console.log('✅ Prisma conectado à base de dados');
  }

  // Função que corre quando o módulo é destruído (app desligada)
  async onModuleDestroy() {
    await this.$disconnect(); // Fecha a ligação à base de dados
    console.log('❌ Prisma desligado da base de dados');
  }
}
