import SpecificationRepository from '../../repositories/SpecificationRepository'
import ListSpecificationService from './ListSpecificationService'
import CreateSpecificationService from './CreateSpecificationService'

const specificationRepository = SpecificationRepository.getInstance()

const listSpecificationService = new ListSpecificationService(specificationRepository) 
const createSpecificationService = new CreateSpecificationService(specificationRepository) 

export { listSpecificationService, createSpecificationService }