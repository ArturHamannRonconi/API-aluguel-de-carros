import { listSpecificationService, createSpecificationService } from '../../services/specificationServices'

import ListSpecificationController from './ListSpecificationController'
import CreateSpecificationController from './CreateSpecificationController'

const listSpecificationController = new ListSpecificationController(listSpecificationService)
const createSpecificationController = new CreateSpecificationController(createSpecificationService)

export { listSpecificationController, createSpecificationController }