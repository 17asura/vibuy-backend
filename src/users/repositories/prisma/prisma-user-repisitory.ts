import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { prisma } from '../../../lib/prisma';

export class PrismaUserRepository implements UserRepository{
async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
  // ✅ Método eficiente para encontrar um utilizador pelo email
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email }, // Prisma usa índice único do email
    });
  }
  
}
