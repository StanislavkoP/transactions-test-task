import { dateHelper } from './date-helper'

describe('dateHelper', () => {
  describe('isSameWeek', () => {
    it('should return true if the same week', () => {
      const result = dateHelper.isSameWeek(new Date('2016-01-05'), new Date('2016-01-06'))

      expect(result).toBe(true)
    })

    it('should return false if is not the same week', () => {
      const result = dateHelper.isSameWeek(new Date('2016-01-05'), new Date('2016-02-06'))

      expect(result).toBe(false)
    })
  })
})
