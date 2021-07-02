import { inject, injectable } from 'tsyringe'

import ICarImage from '@cars/entities/interfaces/ICarImage'
import ICarImageRepository from '@cars/repositories/interfaces/ICarImageRepository'
import CreateCarImage from '@myTypes/CreateCarImage'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider'

@injectable()
class UploadCarImageService
{
  constructor(
    @inject('CarImageRepository')
    private carImageRepository: ICarImageRepository,
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {  }

  public async execute({ car_id, images_name }: CreateCarImage): Promise<ICarImage[]>
  {
    await this.verifyCarExists(car_id)
    return this.createCarImages({ car_id, images_name })
  }

  private async verifyCarExists(car_id: string): Promise<void>
  {
    const carExists = this.carRepository.findById(car_id)
    if(!carExists) throw new AppError('Car not found', 404)
  }

  private async createCarImages({ car_id, images_name }: CreateCarImage): Promise<ICarImage[]>
  {
    return Promise.all(
      images_name.map(image_name =>
        this.carImageRepository.create({ car_id, image_name })
      )
    )
  }
}

export default UploadCarImageService