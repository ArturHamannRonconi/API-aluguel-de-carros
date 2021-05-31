import ICar from '@cars/entities/interfaces/ICar'

interface ICarRepository
{
  create(): Promise<void>
  list(): Promise<ICar>
  findByName(name: string): Promise<ICar>
}

export default ICarRepository