import { inject, injectable } from 'tsyringe'

import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CarCost from '@myTypes/CarCost'
import DailyExpected from '@myTypes/DailyExpected'
import IRental from '@rentals/entities/interfaces/IRental'
import IRentalRepository from '@rentals/repositories/interfaces/IRentalRepository'
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import AppError from '@shared/errors/AppError'

@injectable()
class DevolutionRentalService
{
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {  }
  
  public async execute(user_id: string): Promise<IRental>
  {
    const rental = await this.rentalRepository
      .findLastRentalByUserId(user_id)
      
    if(!rental) throw new AppError('Rental not found', 404)
    
    const carCost = await this.carRepository.getCarCost(rental.car_id)
    const dailyExpected = {
      start_date: rental.start_date,
      expect_return_date: rental.expect_return_date
    }

    const totalPayment = this.calculateTotalPayment(carCost, dailyExpected)
  
    rental.total = totalPayment
    rental.end_date = DayjsDateProvider.now()
    
    await this.rentalRepository.create(rental)
    await this.carRepository.updateAvailable(rental.car_id)

    return rental
  }

  private calculateTotalPayment(carCost: CarCost, dailyExpected: DailyExpected): number
  {
    
    const totalDaily = this.calculateDaily(carCost.daily_rate, dailyExpected)
    const fineForDelay = this.calculateFineForDelay(carCost.fine_amount, dailyExpected)

    const totalPayment = totalDaily + fineForDelay

    return totalPayment
  }

  private calculateDaily(daily_rate: number, dailyExpected: DailyExpected): number
  {
    const daily = DayjsDateProvider.compareInDays(
      dailyExpected.start_date,
      dailyExpected.expect_return_date
    ) 
    const totalDaily = daily * daily_rate

    return totalDaily
  }

  private calculateFineForDelay(fine_amount: number, dailyExpected: DailyExpected): number
  {
    const daysOfDelay = DayjsDateProvider.compareInDays(
      dailyExpected.expect_return_date,
      DayjsDateProvider.now()
    )
    const fineForDelay = daysOfDelay * fine_amount

    return fineForDelay > 0
      ? fineForDelay
      : 0
  }
}

export default DevolutionRentalService