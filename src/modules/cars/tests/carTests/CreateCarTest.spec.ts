import AppError from '@shared/errors/AppError'
import CreateCar from '@myTypes/CreateCar'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import Car from '@cars/infra/typeorm/entities/Car'
import CarRepositoryInMemory from '@cars/repositories/in-memory/CarRepositoryInMemory'
import CreateCarService from '@cars/services/carServices/CreateCarService'


let carRepository: ICarRepository
let createCarService: CreateCarService

const newCar: CreateCar = {
  name: 'Name Car',
  description: 'Description Car',
  daily_rate: 100,
  license_plate: 'ABC-1234',
  fine_amount: 60,
  brand: 'Brand',
  category_id: 'category'
}

describe('Create Car', () => {
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
  
  it('Should be able to create a car with available true by deafult', async () => {
    const { license_plate } = newCar

    await createCarService.execute(newCar)
    const car = await carRepository
      .findByLicensePlate(license_plate)

    expect(car).toHaveProperty('available', true)
  })

  it('Should not be able to create a car that already exists', async () => {
    await createCarService.execute(newCar)
    
    await expect(async () => await createCarService.execute(newCar))
      .rejects
      .toThrow('Car already exists')

    await expect(async () => await createCarService.execute(newCar))
      .rejects
      .toBeInstanceOf(AppError)
  })
})