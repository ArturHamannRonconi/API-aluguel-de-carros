import ICarImage from '../interfaces/ICarImage'
import Car from './Car'

class CarImage implements ICarImage
{
  id: string
  image_name: string
  car_id: string
  car: Car
  created_at: Date
}

export default CarImage