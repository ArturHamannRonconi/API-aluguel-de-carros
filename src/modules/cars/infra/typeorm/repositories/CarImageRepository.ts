import { getRepository, Repository } from 'typeorm'

import ICarImageRepository from '@cars/repositories/interfaces/ICarImageRepository'
import CreateCarImage from '@myTypes/CreateCarImage'
import CarImageTypeOrm from '../entities/CarImageTypeOrm'

class CarImageRepository implements ICarImageRepository
{
  private repository: Repository<CarImageTypeOrm>

  constructor()
  {
    this.repository = getRepository(CarImageTypeOrm)
  }

  public async create({ car_id, image_name }: CreateCarImage): Promise<CarImageTypeOrm>
  {
    const carImage = this.repository.create({ car_id, image_name })
    return await this.repository.save(carImage)
  }
  
}

export default CarImageRepository