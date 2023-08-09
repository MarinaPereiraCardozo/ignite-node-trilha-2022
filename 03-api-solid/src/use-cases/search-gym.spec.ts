import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gym'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -22.5188986,
      longitude: -43.2231173,
    })
    await gymRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -22.5188986,
      longitude: -43.2231173,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.5188986,
        longitude: -43.2231173,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
