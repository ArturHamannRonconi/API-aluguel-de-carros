import ICarImage from './ICarImage'
import ICategory from './ICategory'
import ISpecification from './ISpecification'

interface ICar 
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
  category: ICategory
  images: ICarImage[]
  specifications: ISpecification[]
  created_at: Date
}

export default ICar