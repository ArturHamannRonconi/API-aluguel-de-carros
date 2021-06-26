import { inject, injectable } from 'tsyringe'

import IRental from '@rentals/entities/interfaces/IRental'
import IRentalRepository from '@rentals/repositories/interfaces/IRentalRepository'
import CreateRental from '@myTypes/CreateRental'
import AppError from '@shared/errors/AppError'
import CarAndUserAvailable from '@myTypes/CarAndUserAvailable'
import RentalDuration from '@myTypes/RentalDuration'
import FormatedDate from '@myTypes/FormatedDate'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider'

@injectable()
class CreateRentalService
{
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {  }

  public async execute({
    car_id, user_id,
    start_date, expect_return_date
  }: CreateRental): Promise<IRental>
  {
    const carExists = await this.carRepository.findById(car_id)
    if(!carExists) throw new AppError('Car not found', 404)

    await this.verifyUserAndCarAvailability({ car_id, user_id })
    this.verifyRentalDuration({ start_date, expect_return_date })
    
    const { entrance, deadline } =
      this.formatDate({ start_date, expect_return_date })

    const [ rental ] = await Promise.all([
      this.rentalRepository.create({
        car_id, user_id,
        start_date: entrance,
        expect_return_date: deadline
      }),
      this.carRepository.updateAvailable(car_id)
    ])

    return rental
  }

  private async verifyUserAndCarAvailability({ car_id, user_id }: CarAndUserAvailable): Promise<void>
  {
    const [ userUnavailable, carUnavailable ] = await Promise.all([
      this.rentalRepository.userAlreadyReservedCar(user_id),
      this.rentalRepository.carAlreadyReserved(car_id)
    ])

    if(userUnavailable) throw new AppError('The user already reserved car', 400)
    if(carUnavailable) throw new AppError('The car already reserved', 400)
  }

  private verifyRentalDuration({ expect_return_date, start_date }: RentalDuration): void
  {
    const formatDate = 'DD/MM/YYYY HH:mm'
    const rentIsLessThan24h = this.dateProvider
      .compareDuration({
        value: 1,
        unit: 'day',
        start_date,
        formatDate,
        expect_return_date
      })

    if(rentIsLessThan24h)
      throw new AppError('Minimum rental is with 24h', 400)
  }

  private formatDate({ start_date, expect_return_date }: RentalDuration): FormatedDate
  {
    const formatDate = 'DD/MM/YYYY HH:mm' 

    return this.dateProvider.formatDate({
      formatDate,
      start_date,
      expect_return_date
    })
  }
}

export default CreateRentalService