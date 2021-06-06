import { container } from 'tsyringe' 

import CarRepositoryInMemory from '@cars/repositories/in-memory/CarRepositoryInMemory'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CreateCarSpecificationService from '@cars/services/carServices/CreateCarSpecificationService'
import AppError from '@shared/errors/AppError'
import SpecificationsRepositoryInMemory from '@cars/repositories/in-memory/SpecificationRepositoryInMemory'
import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'

describe('Create a car specification', () => {
  let carRepository: ICarRepository
  let createCarSpecification: CreateCarSpecificationService

  const carAndSpecifications = {
    car_id: '2eafd3bb-0ff3-4a53-86fa-5dcb1cd32df9',
    specifications_id: [
      'f64f260e-5fbe-4bcc-a6c4-b26c4f04328c',
      '6a20239e-65aa-4d14-80c7-0935f3f1d8fa',
      '5f713417-0b4e-4590-9a0f-cb7d31f1c423'
    ]
  }
  
  const nonexistentCarAndSpecifications = {
    car_id: 'Nonexistent Car ID', 
    specifications_id: [
      'f64f260e-5fbe-4bcc-a6c4-b26c4f04328c',
      '5f713417-0b4e-4590-9a0f-cb7d31f1c423'
    ]
  }

  const nenxistentSpecificationAndCar = {
    car_id: 'e357f477-16f4-4db7-8017-b6d2d5d8519b',
    specifications_id: ['Nonexistent Specification ID']
  }

  beforeAll(() => {
    container.registerSingleton<ISpecificationRepository>(
      'SpecificationRepository',
      SpecificationsRepositoryInMemory
    )
    carRepository = new CarRepositoryInMemory()
    createCarSpecification = new CreateCarSpecificationService(carRepository)
  })

  it('Should be able to add a new specification to the car', async () => {
    const specificationsLengthBeforeAddSpecifications = (await carRepository
      .findById(carAndSpecifications.car_id)
    ).specifications.length

    await createCarSpecification.execute(carAndSpecifications)
    
    const carAfterAddSpecifications = await carRepository
      .findById(carAndSpecifications.car_id)

    const totalLength = specificationsLengthBeforeAddSpecifications
    + carAndSpecifications.specifications_id.length 

    expect(carAfterAddSpecifications.specifications)
      .toHaveLength(totalLength)
  })
  
  it('Should not be able to add a new specification to the a nonexistent car', async () => {
    await expect(() => createCarSpecification.execute(nonexistentCarAndSpecifications))
      .rejects
      .toThrow('Car not found')

    await expect(() => createCarSpecification.execute(nonexistentCarAndSpecifications))
      .rejects
      .toBeInstanceOf(AppError)
  })

  it('Should not be able to add a nonexistent specification to the car', async () => {
    await expect(() => createCarSpecification.execute(nenxistentSpecificationAndCar))
      .rejects
      .toThrow('Some specification do not exists')

    await expect(() => createCarSpecification.execute(nenxistentSpecificationAndCar))
      .rejects
      .toBeInstanceOf(AppError)
  })

  it('Should not be able to add a specification on a car that has already been added previously', async () => {
    await expect(() => createCarSpecification.execute(carAndSpecifications))
      .rejects
      .toThrow('Some specification already hitched in the car')

    await expect(() => createCarSpecification.execute(carAndSpecifications))
      .rejects
      .toBeInstanceOf(AppError)
  })
})