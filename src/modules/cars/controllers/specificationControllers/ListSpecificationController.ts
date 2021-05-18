import { Request, Response } from 'express'

import Controller from '../Controller'
import ListSpecificationService from '../../services/specificationServices/ListSpecificationService'

class ListSpecificationController extends Controller
{
  constructor(private listSpecificationService: ListSpecificationService) { super() }

  public handle(request: Request, response: Response): Response | void
  {
    return super.syncTryCatchJson(() => this.listSpecificationService.execute(), response, 200)
  }
}

export default ListSpecificationController