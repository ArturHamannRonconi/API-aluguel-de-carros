import ISpecification from '../interfaces/ISpecification'
import Car from './Car'

class Specification implements ISpecification
{
  id: string
  name: string
  description: string
  created_at: Date
  cars: Car[]
}

export default Specification