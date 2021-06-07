import ICar from '../interfaces/ICar'
import ICarImage from '../interfaces/ICarImage'

class CarImage implements ICarImage
{
  id: string
  image_name: string
  car_id: string
  car: ICar
  created_at: Date
}

export default CarImage