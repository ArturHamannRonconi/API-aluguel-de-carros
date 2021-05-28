import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListCategoryService from '../../services/categoryServices/ListCategoryService'

class ListCategoryController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    const listCategoryService = container.resolve(ListCategoryService) 
    const categories = await listCategoryService.execute()
    return response.status(200).json(categories)
  }
}

export default ListCategoryController