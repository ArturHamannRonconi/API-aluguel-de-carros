import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateCarSpecificationService from '@cars/services/carServices/CreateCarSpecificationService'

class CreateCarSpecificationController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { car_id } = request.params
    const { specifications_id } = request.body

    const createCarSpecificationService = container.resolve(CreateCarSpecificationService)
    await createCarSpecificationService.execute({ car_id, specifications_id })

    return response.status(201).json({ message: 'ok' })
  }
}

export default new CreateCarSpecificationController()