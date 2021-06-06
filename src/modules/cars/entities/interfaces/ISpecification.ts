import ICar from './ICar'

interface ISpecification
{
  id: string
  name: string
  description: string
  cars: ICar[]
  created_at: Date
}

export default ISpecification