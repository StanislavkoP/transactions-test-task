import { ICommissionFeeConfigCashOutLegal } from '../../commission-fee/dto/comission-fee-configuration.dto'
import { ITransaction } from '../../../shared/types/transaction'
import { currencyHelper } from '../../../shared/helpers/currency-helper/currency-helper'
import { CURRENCY_TYPE_LIST } from '../../../shared/constants/constants'
import { CommissionFeeConfigCashOutLegalEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-out-legal.entity'
import { CalculationFeeCashOutLegal } from './calculation-fee-cash-out-legal'

const mockConfig: ICommissionFeeConfigCashOutLegal = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

const mockTransactionWithLessCommission: ITransaction = {
  date: '2016-01-06',
  user_id: 2,
  user_type: 'juridical',
  type: 'cash_out',
  operation: { amount: 100.0, currency: 'EUR' },
}

const mockTransactionWithBigCommission: ITransaction = {
  date: '2016-01-10',
  user_id: 2,
  user_type: 'juridical',
  type: 'cash_in',
  operation: { amount: 300.0, currency: 'EUR' },
}

describe('CalculationFeeCashOutLegal', () => {
  const strategy = new CalculationFeeCashOutLegal(new CommissionFeeConfigCashOutLegalEntity(mockConfig))

  it('calculate() method should be defined', () => {
    expect(typeof strategy.calculate).toBe('function')
  })

  describe('commission calculation', () => {
    it('should return not less than commission in config', () => {
      expect(currencyHelper.rounding(strategy.calculate(mockTransactionWithLessCommission))).toBe(mockConfig.min.amount)
    })

    it('should return 0.9', () => {
      expect(currencyHelper.rounding(strategy.calculate(mockTransactionWithBigCommission))).toBe(0.9)
    })
  })
})
