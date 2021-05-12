import { Request, Response } from 'express'

import Controller from '../Controller'
import ISpecificationRepository from '../../interfaces/ISpecificationRepository'

class ListSpecificationController extends Controller
{
  constructor(private specificationRepository: ISpecificationRepository) { super() }

  execute(request: Request, response: Response): Response | void
  {
    return super.tryCatchJson(() => this.specificationRepository.list(), response, 200)
  }
}

export default ListSpecificationController