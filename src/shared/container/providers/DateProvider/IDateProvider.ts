import FormatedDate from '@myTypes/FormatedDate'
import RentalDuration from '@myTypes/RentalDuration'

interface IDateProvider
{
  formatDate({ start_date, expect_return_date }: RentalDuration): FormatedDate
  compareDuration({ expect_return_date, start_date }: RentalDuration): boolean
}

export default IDateProvider