import { Request, Response } from 'express'

import Controller from '../Controller'
import ImportCategoryService from '../../services/categoryServices/ImportCategoryService'

class ImportCategoryController extends Controller
{
  constructor(private importCategoryService: ImportCategoryService) { super() }

  public async handle(request: Request, response: Response): Promise<Response | void> 
  {
    return await super.tryCatchEnd(async () => {
      const { file } = request
      await this.importCategoryService.execute(file)
    }, response, 200)
  }
}

export default ImportCategoryController