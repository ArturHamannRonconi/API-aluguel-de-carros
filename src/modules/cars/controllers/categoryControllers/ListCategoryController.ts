import { Request, Response } from 'express'

import Controller from '../Controller'
import ListCategoryService from '../../services/categoryServices/ListCategoryService'

class ListCategoryController extends Controller
{
  constructor(private listCategoryService: ListCategoryService) { super() }

  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    return await super.tryCatchJson(async () => await this.listCategoryService.execute(), response, 200)
  }
}

export default ListCategoryController