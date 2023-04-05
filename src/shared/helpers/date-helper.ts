import { isSameWeek } from 'date-fns'

export const dateHelper = {
  isSameWeek: (dateLeft: Date | number, dateRight: Date | number) =>
    isSameWeek(dateLeft, dateRight, { weekStartsOn: 1 }),
}
