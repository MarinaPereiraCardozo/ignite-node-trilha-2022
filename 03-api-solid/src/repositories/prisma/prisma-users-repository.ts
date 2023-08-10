import { Prisma, User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    })
  }
}
