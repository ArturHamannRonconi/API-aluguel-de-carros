import ICategory from './ICategory'

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
  created_at: Date
}

export default ICar