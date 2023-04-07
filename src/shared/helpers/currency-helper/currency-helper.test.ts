import { currencyHelper } from './currency-helper'

describe('currencyHelper', () => {
  describe('rounding()', () => {
    const value = 0.0033333

    it('should return number', () => {
      const result = currencyHelper.rounding(value)
      expect(typeof result).toBe('number')
    })

    it('number is rounded up to the next largest integer', () => {
      const result = currencyHelper.rounding(value)
      expect(result).toBe(0.01)
    })

    it('number has not more than 2 digits after comma', () => {
      const result = currencyHelper.rounding(value)
      expect(result).toBeCloseTo(0.01, 2)
    })
  })

  describe('baseFormat()', () => {
    it('should return string', () => {
      const result = currencyHelper.baseFormat(10)
      expect(typeof result).toBe('string')
    })

    it('should return value with 2 digits after comma', () => {
      const result = currencyHelper.baseFormat(10)
      const regex = /^\d+\.\d{0,2}$/ // matches numbers with up to 2 decimal places
      expect(regex.test(result)).toBe(true)
    })
  })
})
