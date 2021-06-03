import AppError from '@shared/errors/AppError'
import CreateCar from '@myTypes/CreateCar'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CarRepositoryInMemory from '@cars/repositories/in-memory/CarRepositoryInMemory'
import CreateCarService from '@cars/services/carServices/CreateCarService'
import { container } from 'tsyringe'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import CategoryRepositoryInMemory from '@cars/repositories/in-memory/CategoryRepositoryInMemory'

describe('Create Car', () => {
  let carRepository: ICarRepository
  let createCarService: CreateCarService
  
  const newCar: CreateCar = {
    name: 'NEW Name Car',
    description: 'NEW Description Car',
    daily_rate: 110,
    license_plate: 'NEWABC-1234',
    fine_amount: 80,
    brand: 'NEW Brand',
    category_id: '3de39bd1-0d5c-46c1-ace1-394aa5db369e'
  }

  beforeAll(() => {
    container.registerSingleton<ICategoryRepository>(
      'CategoryRepository',
      CategoryRepositoryInMemory
    )
    carRepository =  new CarRepositoryInMemory()
    createCarService = new CreateCarService(carRepository)
  })
  
  it('Should be able to create a car', async () => {
    const { license_plate } = newCar

    await createCarService.execute(newCar)
    const car = await carRepository
      .findByLicensePlate(license_plate)
    
    expect(car).toHaveProperty('id')
  })

  it('Should be able to create a car with available true by deafult', async () => {
    const { license_plate } = newCar
    const car = await carRepository
      .findByLicensePlate(license_plate)

    expect(car).toHaveProperty('available', true)
  })

  it('Should not be able to create a car when category not exists', async () => {
    await expect(() => createCarService.execute({ ...newCar, category_id: 'invalidCategory' }))
      .rejects
      .toThrow('Category not found')

    await expect(() => createCarService.execute({ ...newCar, category_id: 'invalidCategory' }))
      .rejects
      .toBeInstanceOf(AppError)  
  })
  
  it('Should not be able to create a car that already exists', async () => {
    await expect(() => createCarService.execute(newCar))
      .rejects
      .toThrow('Car already exists')

    await expect(() => createCarService.execute(newCar))
      .rejects
      .toBeInstanceOf(AppError)
  })
})