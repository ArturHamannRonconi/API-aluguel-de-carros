import { getRepository, Repository } from 'typeorm'

import IRentalRepository from '@rentals/repositories/interfaces/IRentalRepository'
import RentalTypeOrm from '../entities/RetalTypeOrm'
import CreateRentalRepo from '@myTypes/CreateRentalRepo'

class RentalRepository implements IRentalRepository
{
  private repository: Repository<RentalTypeOrm>

  constructor()
  {
    this.repository = getRepository(RentalTypeOrm)
  }

  public async create(rent: CreateRentalRepo): Promise<RentalTypeOrm>
  {
    const rental = this.repository.create(rent)

    return await this.repository.save(rental)
  }

  public async userAlreadyReservedCar(user_id: string): Promise<boolean>
  {
    const userAlreadyReservedCar = await this.repository.findOne({
      where: { user_id, end_date: null }
    })

    return !!userAlreadyReservedCar
  }

  public async carAlreadyReserved(car_id: string): Promise<boolean>
  {
    const carAlreadyReserved = await this.repository.findOne({
      where: { car_id, end_date: null }
    })

    return !!carAlreadyReserved
  }
}

export default RentalRepository