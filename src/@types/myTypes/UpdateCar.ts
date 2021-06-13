import ISpecification from '@cars/entities/interfaces/ISpecification'

interface UpdateCar {
  specifications?: ISpecification[],
  fine_amount?: number,
  available?: boolean,
  daily_rate?: number,
  license_plate?: string
}

export default UpdateCar 