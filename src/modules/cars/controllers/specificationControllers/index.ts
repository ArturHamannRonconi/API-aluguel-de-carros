import SpecificationRepository from '../../repositories/SpecificationRepository'
import CreateSpecificationService from '../../services/CreateSpecificationServices'

import ListSpecificationController from './ListSpecificationController'
import CreateSpecificationController from './CreateSpecificationController'

const specificationRepository = new SpecificationRepository()
const createSpecificationService = new CreateSpecificationService(specificationRepository)

const listSpecificationController = new ListSpecificationController(specificationRepository)
const createSpecificationController = new CreateSpecificationController(createSpecificationService)

export { listSpecificationController, createSpecificationController }