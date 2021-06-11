import { inject, injectable } from 'tsyringe'

import IRental from '@rentals/entities/interfaces/IRental'
import IRentalRepository from '@rentals/repositories/interfaces/IRentalRepository'

@injectable()
class ListRentalByUserService
{
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository
  ) {  }

  public async execute(user_id: string): Promise<IRental[]>
  {
    return this.rentalRepository.findAllRentalByUserId(user_id)
  }
}

export default ListRentalByUserService