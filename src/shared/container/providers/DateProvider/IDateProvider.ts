import CompareDuration from '@myTypes/CompareDuration'
import FormatDate from '@myTypes/FormatDate'
import FormatedDate from '@myTypes/FormatedDate'

interface IDateProvider
{
  formatDate({ start_date, expect_return_date, formatDate }: FormatDate): FormatedDate
  compareDuration(compareDuration: CompareDuration): boolean
  compareInDays(start_date: Date, end_date: Date): number
  verifyTimeHasBeenExpired(expires_date: Date): boolean  
  addDays(days: number): Date
  addHours(hours: number): Date
  now(): Date 
}

export default IDateProvider