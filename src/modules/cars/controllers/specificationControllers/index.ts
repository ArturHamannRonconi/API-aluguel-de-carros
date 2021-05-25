import specificationServices from '../../services/specificationServices'

import ListSpecificationController from './ListSpecificationController'
import CreateSpecificationController from './CreateSpecificationController'

export default () => {
  const listSpecificationController = new ListSpecificationController(
    specificationServices().listSpecificationService
  )
  const createSpecificationController = new CreateSpecificationController(
    specificationServices().createSpecificationService
  )
  
  return { listSpecificationController, createSpecificationController }
}