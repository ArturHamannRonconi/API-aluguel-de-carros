import ICarImage from '@cars/entities/interfaces/ICarImage'
import CreateCarImage from '@myTypes/CreateCarImage'

interface ICarImageRepository
{
  create({ car_id, image_name }: CreateCarImage): Promise<ICarImage>

}

export default ICarImageRepository