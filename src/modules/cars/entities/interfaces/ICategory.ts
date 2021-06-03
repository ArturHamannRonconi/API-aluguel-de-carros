import ICar from './ICar'

interface ICategory
{
  id: string
  name: string
  description: string
  created_at: Date
  cars?: ICar[] 
}

export default ICategory