import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { SearchGymUseCase } from '../search-gym'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymUseCase = new SearchGymUseCase(gymsRepository)

  return searchGymUseCase
}
