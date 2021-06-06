import CreateCarService from '@cars/services/carServices/CreateCarService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateCarController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications_id
    } = request.body

    const createCarService = container.resolve(CreateCarService)
    await createCarService.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications_id
    })

    return response.status(201).end()
  }
}

export default new CreateCarController()