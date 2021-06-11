import RentalRepositoryInMemory from '@rentals/repositories/in-memory/RentalRepositoryInMemory'
import IRentalRepository from '@rentals/repositories/interfaces/IRentalRepository'
import ListRentalByUserService from '@rentals/services/rentalServices/ListRentalByUserService'

describe('List all rental by user', () => {
  let rentalRepository: IRentalRepository 
  let listRentalByUserService: ListRentalByUserService

  const user_id = 'e357f477-16f4-4db7-8017-b6d2d5d8519b'

  beforeAll(() => {
    rentalRepository = new RentalRepositoryInMemory() 
    listRentalByUserService = new ListRentalByUserService(rentalRepository)
  })

  it('Should be able to list all rental by user', async () => {
    const allUserRentals = await listRentalByUserService
      .execute(user_id)

    expect(allUserRentals).toHaveLength(2)
  })
})