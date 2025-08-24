import { PrismaUserRepository } from "src/users/repositories/prisma/prisma-user-repisitory";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { BadRequestException } from "@nestjs/common";

// Função para validar os dados de registo de um utilizador
export async function validateCreatedUser(dto: CreateUserDto) {
    const { email, email_verify, terms_verify, hashed_password, name } = dto;

    // 1️⃣ Verifica se o utilizador aceitou os termos e condições
    if (!terms_verify) {
        throw new BadRequestException('You must accept terms and conditions!');
    }

    // 2️⃣ Verifica se o email foi validado
    if (!email_verify) {
        throw new BadRequestException('You must validate your e-mail!');
    }

    // 3️⃣ Valida o nome do utilizador (não pode estar vazio e remove espaços)
    if (!name || name.trim() === '') {
        throw new BadRequestException('The name cannot be null or empty!');
    }

    // 4️⃣ Valida o email (formato correto)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        throw new BadRequestException('Invalid email format!');
    }

    // 5️⃣ Verifica se a password existe e é forte
    // Requisitos básicos de segurança: min 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 símbolo
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!hashed_password || !passwordRegex.test(hashed_password)) {
        throw new BadRequestException(
            'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character!'
        );
    }

    // 6️⃣ Verifica se o email já existe na base de dados
    const userRepository = new PrismaUserRepository();
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new BadRequestException('Email already in use!');
    }

    // ✅ Se passar todas as validações, retorna true
    return true;
}
