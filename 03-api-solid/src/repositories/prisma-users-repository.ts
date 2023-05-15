import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    })
  }
}
