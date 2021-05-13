import { Request, Response } from 'express'

import Controller from '../Controller'
import ListCategoryService from '../../services/categoryServices/ListCategoryService'

class ListCategoryController extends Controller
{
  constructor(private listCategoryService: ListCategoryService) { super() }

  public execute(request: Request, response: Response): Response | void
  {
    return super.tryCatchJson(() => this.listCategoryService.execute(), response, 200)
  }
}

export default ListCategoryController