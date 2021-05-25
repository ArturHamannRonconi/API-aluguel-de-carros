import { Request, Response } from 'express'

import Controller from '../Controller'
import ListSpecificationService from '../../services/specificationServices/ListSpecificationService'

class ListSpecificationController extends Controller
{
  constructor(private listSpecificationService: ListSpecificationService) { super() }

  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    return await super.tryCatchJson(async () => await this.listSpecificationService.execute(), response, 200)
  }
}

export default ListSpecificationController