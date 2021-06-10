import { getRepository, Repository } from 'typeorm'

import IRentalRepository from '@rentals/repositories/interfaces/IRentalRepository'
import RentalTypeOrm from '../entities/RetalTypeOrm'
import CreateRentalRepo from '@myTypes/CreateRentalRepo'
import IRental from '@rentals/entities/interfaces/IRental'
import RentalAddInfo from '@myTypes/RentalAddInfo'

class RentalRepository implements IRentalRepository
{
  private repository: Repository<RentalTypeOrm>

  constructor()
  {
    this.repository = getRepository(RentalTypeOrm)
  }

  public async update(rent_id: string, add_info: RentalAddInfo): Promise<void>
  {
    await this.repository.update(rent_id, add_info)
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
    const [{ carAvailable }] = await this.repository.query(`
      SELECT available as "carAvailable" 
      FROM cars
      WHERE id = $1
    `, [car_id])

    return !carAvailable
  }

  public async findLastRentalByUserId(user_id: string): Promise<IRental>
  {
    const rental = this.repository.findOne({
      where: { user_id, end_date: null },
      
    })

    return rental
  }
}

export default RentalRepository