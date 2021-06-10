import CarRepositoryInMemory from '@cars/repositories/in-memory/CarRepositoryInMemory'
import RentalRepositoryInMemory from '@rentals/repositories/in-memory/RentalRepositoryInMemory'
import DevolutionRentalService from '@rentals/services/rentalServices/DevolutionRentalService'

describe('Devolution rental', () => {
  let rentalRepository: RentalRepositoryInMemory
  let carRepository: CarRepositoryInMemory
  let devolutionRentalService: DevolutionRentalService
  
  const user_id = 'e357f477-16f4-4db7-8017-b6d2d5d8519b'

  beforeEach(() => {
    rentalRepository = new RentalRepositoryInMemory()
    carRepository = new CarRepositoryInMemory()
    devolutionRentalService = new DevolutionRentalService(rentalRepository, carRepository)
  })
  
  it('Should be able to devolution a car', async () => {
    await devolutionRentalService.execute(user_id)

    
  })
})