import { Checkin, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findById(checkInId: string): Promise<Checkin | null>
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
  countByUserId(userId: string): Promise<number>
  save(checkIn: Checkin): Promise<Checkin>
}
