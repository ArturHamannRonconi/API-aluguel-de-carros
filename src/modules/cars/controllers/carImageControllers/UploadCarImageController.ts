import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UploadCarImageService from '@cars/services/carImageServices/UploadCarImageService'

class UploadCarImageController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { car_id } = request.params
    const images = request.files as Express.Multer.File[]

    const images_name = images.map(file => file.filename)

    const uploadCarImageService = container.resolve(UploadCarImageService)
    const carImages = await uploadCarImageService
      .execute({ car_id, images_name })

    return response.status(201).json(carImages)
  }
}

export default new UploadCarImageController()