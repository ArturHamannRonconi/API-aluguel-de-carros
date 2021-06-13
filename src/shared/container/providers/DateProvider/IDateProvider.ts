import CompareDuration from '@myTypes/CompareDuration'
import FormatedDate from '@myTypes/FormatedDate'
import RentalDuration from '@myTypes/RentalDuration'

interface IDateProvider
{
  formatDate({ start_date, expect_return_date }: RentalDuration): FormatedDate
  compareDuration(compareDuration: CompareDuration): boolean
  compareInDays(start_date: Date, end_date: Date): number
  addDays(days: number): Date
  now(): Date 
}

export default IDateProvider