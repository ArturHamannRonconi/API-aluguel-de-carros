import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListCategoryService from '@cars/services/categoryServices/ListCategoryService'

class ListCategoryController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    const listCategoryService = container.resolve(ListCategoryService)

    const categories = await listCategoryService.execute()

    return response.json(categories)
  }
}

export default new ListCategoryController()