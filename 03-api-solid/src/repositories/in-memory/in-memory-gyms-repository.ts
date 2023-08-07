import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(userId: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === userId)
    if (!gym) {
      return null
    }
    return gym
  }
}
