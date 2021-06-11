import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListRentalByUserService from '@rentals/services/rentalServices/ListRentalByUserService'

class ListRentalByUserController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { user_id } = request

    const listRentalByUserService = container.resolve(ListRentalByUserService)
    const rentals = await listRentalByUserService.execute(user_id)

    return response.json(rentals)
  }
}

export default new ListRentalByUserController()