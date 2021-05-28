import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListSpecificationService from '../../services/specificationServices/ListSpecificationService'

class ListSpecificationController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    const listSpecificationService = container.resolve(ListSpecificationService)
      
    const specifications = await listSpecificationService.execute()
    return response.status(200).json(specifications)    
  }
}

export default ListSpecificationController