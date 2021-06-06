import Car from '@cars/entities/implementations/Car'
import CarRepositoryInMemory from '@cars/repositories/in-memory/CarRepositoryInMemory'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import ListAvailableCarService from '@cars/services/carServices/ListAvailableCarService'

describe('List Cars', () => {
  let carRepository: ICarRepository
  let listAvailableCarService: ListAvailableCarService
  
  beforeAll(() => {
    carRepository = new CarRepositoryInMemory()
    listAvailableCarService = new ListAvailableCarService(carRepository)
  })

  it('Should be able to list all available cars', async () => {
    const allAvailableCars = await listAvailableCarService.execute()
    const allCars = await carRepository.findAll()

    expect(allAvailableCars[0]).toBeInstanceOf(Car)
    expect(allCars.length).toBeGreaterThanOrEqual(allAvailableCars.length)
    expect(allCars.filter(car => car.available === true))
      .toEqual(expect.arrayContaining(allAvailableCars))
  })

  it('Should be able to list all available cars by name', async () => {
    const name = 'Name Car'
    const availableCarsByName = await listAvailableCarService.execute({ name })

    expect(availableCarsByName.reduce((acc, car) => {
      if(car.name === name && car.available === true) return ++acc
    }, 0))
      .toBe(availableCarsByName.length)
  })

  it('Should be able to list all available cars by category', async () => {
    const category_id = 'b17af4e0-c2c3-4003-af17-6df6e2928ee8'
    const availableCarsByCategory = await listAvailableCarService.execute({ category_id })

    expect(availableCarsByCategory.reduce((acc, car) => {
      if(car.category_id === category_id && car.available === true) return ++acc
    }, 0))
      .toBe(availableCarsByCategory.length)
  })

  it('Should be able to list all available cars by brand', async () => {
    const brand = 'Brand'
    const availableCarsByBrand = await listAvailableCarService.execute({ brand })

    expect(availableCarsByBrand.reduce((acc, car) => {
      if(car.brand === brand && car.available === true) return ++acc
    }, 0))
      .toBe(availableCarsByBrand.length)
  })
})