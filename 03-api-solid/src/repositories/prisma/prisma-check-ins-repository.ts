import { Checkin, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { CheckInsRepository } from '../check-ins-repository'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(checkInId: string): Promise<Checkin | null> {
    const checkIn = await prisma.checkin.findUnique({
      where: {
        id: checkInId,
      },
    })
    return checkIn
  }

  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn = await prisma.checkin.create({
      data,
    })
    return checkIn
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    const checkIns = await prisma.checkin.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return checkIns
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<Checkin | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
    return checkIn
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkin.count({
      where: {
        user_id: userId,
      },
    })
    return count
  }

  async save(data: Checkin): Promise<Checkin> {
    const checkIn = await prisma.checkin.update({
      where: {
        id: data.id,
      },
      data,
    })
    return checkIn
  }
}
