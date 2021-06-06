import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListSpecificationService from '@cars/services/specificationServices/ListSpecificationService'

class ListSpecificationController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    const listSpecificationService = container.resolve(ListSpecificationService)
      
    const specifications = await listSpecificationService.execute()

    return response.json(specifications)    
  }
}

export default new ListSpecificationController()