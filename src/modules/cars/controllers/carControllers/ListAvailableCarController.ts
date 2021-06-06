import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListAvailableCarService from '@cars/services/carServices/ListAvailableCarService'
import ListCarByNameCategoryAndBrand from '@myTypes/ListCarByNameCategoryAndBrand'

class ListAvailableCarController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { name, brand, category_id } = request.query as ListCarByNameCategoryAndBrand

    const listBy = Object.entries({ name, brand, category_id })

    const listByFiltered = listBy.reduce((acc, arr) => {
      if(arr[1] !== undefined)
        acc[arr[0]] = arr[1]

      return acc
    },{})

    const listAvailableCarService = container.resolve(ListAvailableCarService)
    const cars = await listAvailableCarService.execute(listByFiltered)

    return response.json(cars)
  }
}

export default new ListAvailableCarController()