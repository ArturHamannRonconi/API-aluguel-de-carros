import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ImportCategoryService from '../../services/categoryServices/ImportCategoryService'

class ImportCategoryController
{
  public async handle(request: Request, response: Response): Promise<Response | void> 
  {
    const { file } = request
    const importCategoryService = container.resolve(ImportCategoryService)

    await importCategoryService.execute(file)
    return response.status(201).end()
  }
}

export default ImportCategoryController