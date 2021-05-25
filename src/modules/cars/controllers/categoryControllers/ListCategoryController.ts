import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListCategoryService from '../../services/categoryServices/ListCategoryService'

class ListCategoryController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    try {
      const listCategoryService = container.resolve(ListCategoryService) 
      const categories = await listCategoryService.execute()
      return response.status(200).json(categories)

    } catch (error) {
      const [ statusCodeError, message ] = error.message.split('/')

      return response.status(statusCodeError).json({ error: message })
    }
  }
}

export default ListCategoryController