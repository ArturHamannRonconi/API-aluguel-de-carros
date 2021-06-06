import ICar from '../interfaces/ICar'
import Category from './Category'
import Specification from './Specification'

class Car implements ICar
{
  id: string
  name: string
  description: string
  daily_rate: number
  available: boolean
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
  category: Category
  specifications: Specification[]
  created_at: Date
}

export default Car