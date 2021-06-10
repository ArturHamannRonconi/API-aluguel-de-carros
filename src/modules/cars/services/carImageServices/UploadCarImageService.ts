import { inject, injectable } from 'tsyringe'

import ICarImage from '@cars/entities/interfaces/ICarImage'
import ICarImageRepository from '@cars/repositories/interfaces/ICarImageRepository'
import CreateCarImage from '@myTypes/CreateCarImage'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class UploadCarImageService
{
  constructor(
    @inject('CarImageRepository')
    private carImageRepository: ICarImageRepository,
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {  }

  public async execute({ car_id, images_name }: CreateCarImage): Promise<ICarImage[]>
  {
    const images = [] as ICarImage[]
    
    const carExists = this.carRepository.findById(car_id)
    if(!carExists) throw new AppError('Car not found', 404)

    await Promise.all(
      images_name.map(async image_name => {
        const carImage = await this.carImageRepository
          .create({ car_id, image_name })
        
        images.push(carImage)
      })
    )

    return images
  }
}

export default UploadCarImageService