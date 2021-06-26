import CarRepositoryInMemory from '@cars/repositories/in-memory/CarRepositoryInMemory'
import Rental from '@rentals/entities/implementations/Rental'
import RentalRepositoryInMemory from '@rentals/repositories/in-memory/RentalRepositoryInMemory'
import DevolutionRentalService from '@rentals/services/rentalServices/DevolutionRentalService'
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider'
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import AppError from '@shared/errors/AppError'

describe('Devolution rental', () => {
  let rentalRepository: RentalRepositoryInMemory
  let carRepository: CarRepositoryInMemory
  let devolutionRentalService: DevolutionRentalService
  let dateProvider: IDateProvider

  const user_id = 'e357f477-16f4-4db7-8017-b6d2d5d8519b'

  beforeAll(() => {
    rentalRepository = new RentalRepositoryInMemory()
    carRepository = new CarRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    devolutionRentalService = new DevolutionRentalService(
      rentalRepository,
      carRepository,
      dateProvider
    )
  })
  
  it('Should be able to devolution a car', async () => {
    const rental = await devolutionRentalService.execute(user_id)
    
    expect(rental).toBeInstanceOf(Rental)
  })
  
  it('Should not be able to devolution a car if user not has rent', async () => {
    await expect(() => devolutionRentalService.execute(user_id))
      .rejects
      .toBeInstanceOf(AppError)

    await expect(() => devolutionRentalService.execute(user_id))
      .rejects
      .toThrow('Rental not found')
  })
})