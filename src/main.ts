// Ponto de entrada da aplicação NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Cria a aplicação a partir do AppModule
  const app = await NestFactory.create(AppModule);

  // Ativa a validação automática com class-validator (para DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove dados que não estejam no DTO
      forbidNonWhitelisted: true, // Dá erro se mandarem campos a mais
      transform: true, // Transforma inputs nos tipos corretos
    }),
  );

  await app.listen(3000); // Inicia servidor na porta 3000
  console.log('🚀 Vibuy Backend está a correr em http://localhost:3000');
}
bootstrap();
