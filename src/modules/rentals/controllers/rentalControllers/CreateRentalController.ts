import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateRentalService from '@rentals/services/rentalServices/CreateRentalService'

class CreateRentalController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { user_id } = request
    const { car_id } =  request.params
    const { start_date, expect_return_date } = request.body

    const createRentalService = container.resolve(CreateRentalService)
    const rental = await createRentalService.execute({
      car_id, user_id,
      start_date, expect_return_date
    })

    return response.status(201).json(rental)
  }
}

export default new CreateRentalController()