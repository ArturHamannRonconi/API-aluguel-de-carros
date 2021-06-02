import AppError from '@shared/errors/AppError'
import CreateCar from '@myTypes/CreateCar'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import Car from '@cars/entities/implementations/Car'
import CarRepositoryInMemory from '@cars/repositories/in-memory/CarRepositoryInMemory'
import CreateCarService from '@cars/services/carServices/CreateCarService'
import { container } from 'tsyringe'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import CategoryRepositoryInMemory from '@cars/repositories/in-memory/CategoryRepositoryInMemory'


let carRepository: ICarRepository
let createCarService: CreateCarService

const newCar: CreateCar = {
  name: 'Name Car',
  description: 'Description Car',
  daily_rate: 100,
  license_plate: 'ABC-1234',
  fine_amount: 60,
  brand: 'Brand',
  category_id: '3de39bd1-0d5c-46c1-ace1-394aa5db369e'
}

describe('Create Car', () => {
  beforeAll(() => {
    container.registerSingleton<ICategoryRepository>(
      'CategoryRepository',
      CategoryRepositoryInMemory
    )
  })

  beforeEach(() => {
    carRepository =  new CarRepositoryInMemory()
    createCarService = new CreateCarService(carRepository)
  })
  
  it('Should be able to create a car', async () => {
    const { license_plate } = newCar

    await createCarService.execute(newCar)
    const car = await carRepository
      .findByLicensePlate(license_plate)
    
    expect(car).toHaveProperty('id')
    expect(car).toHaveProperty('category_id')
    expect(car).toHaveProperty('created_at')
    expect(car).toBeInstanceOf(Car)
  })

  it('Should not be able to create a car when category not exists', async () => {
    await expect(() => createCarService.execute({
      ...newCar,
      category_id: 'invalidCategory'
    }))
      .rejects
      .toThrow('Category not found')

    await expect(() => createCarService.execute({
      ...newCar,
      category_id: 'invalidCategory'
    }))
      .rejects
      .toBeInstanceOf(AppError)  
  })
  
  it('Should be able to create a car with available true by deafult', async () => {
    const { license_plate } = newCar
    await createCarService.execute(newCar)
    const car = await carRepository
      .findByLicensePlate(license_plate)

    expect(car).toHaveProperty('available', true)
  })

  it('Should not be able to create a car that already exists', async () => {
    await createCarService.execute(newCar)

    await expect(() => createCarService.execute(newCar))
      .rejects
      .toThrow('Car already exists')

    await expect(() => createCarService.execute(newCar))
      .rejects
      .toBeInstanceOf(AppError)
  })
})