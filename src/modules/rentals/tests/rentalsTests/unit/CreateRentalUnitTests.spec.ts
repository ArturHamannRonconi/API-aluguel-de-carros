import RentalRepositoryInMemory from '@rentals/repositories/in-memory/RentalRepositoryInMemory'
import IRentalRepository from '@rentals/repositories/interfaces/IRentalRepository'
import CreateRentalService from '@rentals/services/rentalServices/CreateRentalService'
import AppError from '@shared/errors/AppError'


describe('Create a rental car', () => {
  let rentalRepository: IRentalRepository
  let createRentalService: CreateRentalService 

  const newRental = {
    car_id: '2eafd3bb-0ff3-4a53-86fa-5dcb1cd32df9',
    user_id: '32c4102c-acfe-458b-a508-cbb44f462679',
    start_date: '07/06/2021 16:52',
    expect_return_date: '08/06/2021 16:52'
  }
  const newRentalWithTheSameUser = {
    car_id: 'e357f477-16f4-4db7-8017-b6d2d5d8519b',
    user_id: '32c4102c-acfe-458b-a508-cbb44f462679',
    start_date: '07/06/2021 16:52',
    expect_return_date: '08/06/2021 16:52'
  }
  const newRentalWithTheSameCar = {
    car_id: '2eafd3bb-0ff3-4a53-86fa-5dcb1cd32df9',
    user_id: '2d2e9d13-bcf8-4d4c-a9f4-8ee848a9b4e4',
    start_date: '07/06/2021 16:52',
    expect_return_date: '08/06/2021 16:52'
  }
  const newRentalWithLessThen24h = {
    car_id: '1d3066d6-ce69-4bc1-9282-7a417e9b0d8b',
    user_id: '19f0b083-2a8e-4791-8d0a-cb0d70cffc3d',
    start_date: '07/06/2021 16:52',
    expect_return_date: '08/06/2021 16:51'
  }

  beforeAll(() => {
    rentalRepository = new RentalRepositoryInMemory()
    createRentalService = new CreateRentalService(rentalRepository)
  })
  
  it('Should be able to register a rental car', async () => {
    const rental = await createRentalService.execute(newRental)
    
    expect(rental).toHaveProperty('id')
  })
  
  it('Should not be able to register a rent if the user already registered a car', async () => {
    await expect(() =>
      createRentalService
        .execute(newRentalWithTheSameUser)
    ).rejects.toThrow('The user already reserved car')

    await expect(() =>
      createRentalService
        .execute(newRentalWithTheSameUser)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to register a rent if the car already reserved', async () => {
    await expect(() =>
      createRentalService
        .execute(newRentalWithTheSameCar)
    ).rejects.toThrow('The car already reserved')

    await expect(() =>
      createRentalService
        .execute(newRentalWithTheSameCar)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to register a rental with less then 24h', async () => {
    await expect(() =>
      createRentalService
        .execute(newRentalWithLessThen24h)
    ).rejects.toThrow('Minimum rental is with 24h')

    await expect(() =>
      createRentalService
        .execute(newRentalWithLessThen24h)
    ).rejects.toBeInstanceOf(AppError)
  })
})