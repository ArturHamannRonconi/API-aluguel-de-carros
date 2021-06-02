import ICategory from '@cars/entities/interfaces/ICategory'

class Car 
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

export default Car