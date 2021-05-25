import SpecificationRepository from '../../repositories/SpecificationRepository'
import ListSpecificationService from './ListSpecificationService'
import CreateSpecificationService from './CreateSpecificationService'

export default () => {
  const specificationRepository = new SpecificationRepository()
  
  const listSpecificationService = new ListSpecificationService(specificationRepository) 
  const createSpecificationService = new CreateSpecificationService(specificationRepository) 
  
  return { listSpecificationService, createSpecificationService }
}