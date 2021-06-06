import ISpecification from '@cars/entities/interfaces/ISpecification'

type CreateCar = {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
  specifications_id?: string[]
  specifications?: ISpecification[]
}

export default CreateCar