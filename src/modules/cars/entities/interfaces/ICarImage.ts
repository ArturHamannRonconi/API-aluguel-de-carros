import ICar from './ICar'

interface ICarImage
{
  id: string
  image_name: string
  car_id: string
  car: ICar
  created_at: Date
}

export default ICarImage