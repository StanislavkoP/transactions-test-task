import { CalculationFeeCashIn } from './calculation-fee-cash-in'
import { ICommissionFeeConfigCashIn } from '../../commission-fee/dto/comission-fee-configuration.dto'
import { CommissionFeeConfigCashInEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-in.entity'
import { ITransaction } from '../../../shared/types/transaction'
import { currencyHelper } from '../../../shared/helpers/currency-helper/currency-helper'
import { CURRENCY_TYPE_LIST } from '../../../shared/constants/constants'

const mockConfig: ICommissionFeeConfigCashIn = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

const mockTransactionWithLessCommission: ITransaction = {
  date: '2016-01-05',
  user_id: 1,
  user_type: 'natural',
  type: 'cash_in',
  operation: { amount: 200.0, currency: 'EUR' },
}

const mockTransactionWithBigCommission: ITransaction = {
  date: '2016-01-10',
  user_id: 2,
  user_type: 'juridical',
  type: 'cash_in',
  operation: { amount: 1000000.0, currency: 'EUR' },
}

describe('CalculationFeeCashIn', () => {
  const strategy = new CalculationFeeCashIn(new CommissionFeeConfigCashInEntity(mockConfig))

  it('calculate() method should be defined', () => {
    expect(typeof strategy.calculate).toBe('function')
  })

  describe('commission calculation', () => {
    it('should return not more than commission in config', () => {
      expect(currencyHelper.rounding(strategy.calculate(mockTransactionWithBigCommission))).toBe(mockConfig.max.amount)
    })

    it('should return 0.06', () => {
      expect(currencyHelper.rounding(strategy.calculate(mockTransactionWithLessCommission))).toBe(0.06)
    })
  })
})
