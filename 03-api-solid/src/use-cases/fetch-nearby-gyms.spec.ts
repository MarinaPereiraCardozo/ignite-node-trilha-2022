import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.5129092,
      longitude: -43.2178384,
    })
    await gymRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -22.4283879,
      longitude: -43.1363774,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.5133007,
      userLongitude: -43.2162612,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  // it('should be able to fetch paginated gyms search', async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await gymRepository.create({
  //       title: `Javascript Gym ${i}`,
  //       description: null,
  //       phone: null,
  //       latitude: -22.5188986,
  //       longitude: -43.2231173,
  //     })
  //   }

  //   const { gyms } = await sut.execute({
  //     query: 'Javascript',
  //     page: 2,
  //   })

  //   expect(gyms).toHaveLength(2)
  //   expect(gyms).toEqual([
  //     expect.objectContaining({ title: 'Javascript Gym 21' }),
  //     expect.objectContaining({ title: 'Javascript Gym 22' }),
  //   ])
  // })
})
