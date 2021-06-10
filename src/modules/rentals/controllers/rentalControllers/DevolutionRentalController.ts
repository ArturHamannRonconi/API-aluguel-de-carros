import { Request, Response } from 'express'
import { container } from 'tsyringe'

import DevolutionRentalService from '@rentals/services/rentalServices/DevolutionRentalService'

class DevolutionRentalController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { user_id } = request

    const devolutionRentalService = container.resolve(DevolutionRentalService)
    const rental = await devolutionRentalService.execute(user_id)

    return response.status(200).json(rental)
  }
}

export default new DevolutionRentalController()