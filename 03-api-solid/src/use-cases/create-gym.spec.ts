import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript',
      description: null,
      phone: null,
      latitude: -22.5188986,
      longitude: -43.2231173,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
