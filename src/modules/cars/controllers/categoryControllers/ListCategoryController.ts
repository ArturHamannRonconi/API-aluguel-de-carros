import { Request, Response } from 'express'

import Controller from '../Controller'
import ICategoryRepository from '../../interfaces/ICategoryRepository'

class ListCategoryController extends Controller
{
  constructor(private categoryRepository: ICategoryRepository) { super() }

  execute(request: Request, response: Response): Response | void
  {
    return super.tryCatchJson(() => this.categoryRepository.list(), response, 200)
  }
}

export default ListCategoryController