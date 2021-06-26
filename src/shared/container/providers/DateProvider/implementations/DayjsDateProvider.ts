import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import FormatedDate from '@myTypes/FormatedDate'
import IDateProvider from '../IDateProvider'
import CompareDuration from '@myTypes/CompareDuration'
import FormatDate from '@myTypes/FormatDate'

class DayjsDateProvider implements IDateProvider
{
  constructor()
  {
    dayjs.extend(customParseFormat)
  }

  public verifyTimeHasBeenExpired(expires_date: Date): boolean
  {
    return dayjs(expires_date).isBefore(this.now())
  }

  public addHours(hours: number): Date
  {
    return dayjs().add(hours, 'hours').toDate()
  }

  public addDays(days: number): Date
  {
    return dayjs().add(days, 'days').toDate()
  }

  public now(): Date
  {
    return dayjs().toDate()
  }

  public compareInDays(start_date: Date, end_date: Date): number
  {
    const differenceInHours = dayjs(start_date).diff(end_date, 'days')

    return differenceInHours
  }

  public formatDate({ start_date, expect_return_date, formatDate }: FormatDate): FormatedDate
  {
    const entrance = dayjs(start_date, formatDate).toDate()
    const deadline = dayjs(expect_return_date, formatDate).toDate()

    return { entrance, deadline }
  }

  public compareDuration({
    expect_return_date,
    start_date,
    formatDate,
    unit,
    value
  }: CompareDuration): boolean
  {
    const entrance = dayjs(start_date, formatDate)
    const deadline = dayjs(expect_return_date, formatDate)

    return deadline.subtract(value, unit).isBefore(entrance)
  }
}

export default DayjsDateProvider