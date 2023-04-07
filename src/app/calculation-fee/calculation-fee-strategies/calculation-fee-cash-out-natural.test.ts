import { ICommissionFeeConfigCashOutNatural } from '../../commission-fee/dto/comission-fee-configuration.dto'
import { ITransaction } from '../../../shared/types/transaction'
import { currencyHelper } from '../../../shared/helpers/currency-helper/currency-helper'
import { CURRENCY_TYPE_LIST } from '../../../shared/constants/constants'
import { CalculationFeeCashOutNatural } from './calculation-fee-cash-out-natural'
import { CommissionFeeConfigCashOutNaturalEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-out-natural.entity'

const mockConfig: ICommissionFeeConfigCashOutNatural = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

const mockTransactionWithLessCommission: ITransaction = {
  date: '2016-01-07',
  user_id: 1,
  user_type: 'natural',
  type: 'cash_out',
  operation: { amount: 100.0, currency: 'EUR' },
}

const mockTransactionWithBigCommission: ITransaction = {
  date: '2016-01-07',
  user_id: 1,
  user_type: 'natural',
  type: 'cash_out',
  operation: { amount: 1000.0, currency: 'EUR' },
}

const mockTransactions = [mockTransactionWithLessCommission, mockTransactionWithBigCommission]

describe('CalculationFeeCashOutNatural', () => {
  describe('methods', () => {
    const strategy = new CalculationFeeCashOutNatural(new CommissionFeeConfigCashOutNaturalEntity(mockConfig))

    it('prepareUserTransactionsIfNotExists() should add list of transactions for userId to userTransactions', () => {
      strategy.prepareUserTransactionsIfNotExists(mockTransactionWithLessCommission.user_id)

      const userTransactions = strategy.getUserTransactions(mockTransactionWithLessCommission.user_id)

      expect(userTransactions).toHaveLength(0)
    })

    it('setTransactionToUser() should add transaction to userTransactions', () => {
      strategy.setTransactionToUser(mockTransactionWithLessCommission)

      const [addedTransaction] = strategy.getUserTransactions(mockTransactionWithLessCommission.user_id)

      expect(addedTransaction).toEqual(mockTransactionWithLessCommission)
    })

    it('getUserTransactions() should return user transactions', () => {
      const [addedTransaction] = strategy.getUserTransactions(mockTransactionWithLessCommission.user_id)

      expect(addedTransaction).toEqual(mockTransactionWithLessCommission)
    })

    it('getUserTotalAmountTransactionsByWeek() should return correct amount', () => {
      const amount = strategy.getUserTotalAmountTransactionsByWeek(
        mockTransactionWithLessCommission.date,
        mockTransactions,
      )

      expect(amount).toBe(
        mockTransactionWithLessCommission.operation.amount + mockTransactionWithBigCommission.operation.amount,
      )
    })
  })

  describe('commission calculation', () => {
    let strategy: CalculationFeeCashOutNatural

    beforeEach(() => {
      strategy = new CalculationFeeCashOutNatural(new CommissionFeeConfigCashOutNaturalEntity(mockConfig))
    })

    it('calculate() method should be defined', () => {
      expect(typeof strategy.calculate).toBe('function')
    })

    it('should return correct value where is operation amount more than is in config for week', () => {
      const result: number[] = []

      for (const transaction of mockTransactions) {
        result.push(currencyHelper.rounding(strategy.calculate(transaction)))
      }

      expect(result).toEqual([0, 0.3])
    })

    it('should return correct value where is operation amount less than is in config for week', () => {
      const result: number[] = []

      mockTransactions[1].user_id = 2

      for (const transaction of mockTransactions) {
        result.push(currencyHelper.rounding(strategy.calculate(transaction)))
      }

      expect(result).toEqual([0, 0])
    })
  })
})
