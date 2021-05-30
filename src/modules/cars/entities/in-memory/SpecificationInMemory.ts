import ISpecification from '../interfaces/ISpecification'

class SpecificationInMemory implements ISpecification
{
  id: string;
  name: string;
  description: string;
  created_at: Date;
  
}

export default SpecificationInMemory