import { OpUnitType } from 'dayjs'

type CompareDuration = 
{
  expect_return_date: string
  start_date: string
  formatDate: string
  unit: OpUnitType
  value: number
}

export default CompareDuration