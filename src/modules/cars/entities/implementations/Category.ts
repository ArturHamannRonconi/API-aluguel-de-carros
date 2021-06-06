import ICategory from '../interfaces/ICategory'
import Car from './Car'

class Category implements ICategory
{
  id: string
  name: string
  description: string
  created_at: Date
  cars: Car[] 
}

export default Category