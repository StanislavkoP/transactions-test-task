import { CommissionFeeConfigCashOutNaturalEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-out-natural.entity'
import { ITransaction } from '../../../shared/types/transaction'
import { dateHelper } from '../../../shared/helpers/date-helper/date-helper'
import { CalculationFeeBase } from './calculation-fee-base'

export class CalculationFeeCashOutNatural extends CalculationFeeBase {
  private readonly config: CommissionFeeConfigCashOutNaturalEntity

  // Collect transactions in the array descending by transaction date
  private userTransactions: Map<ITransaction['user_id'], Array<ITransaction>> = new Map()

  constructor(config: CommissionFeeConfigCashOutNaturalEntity) {
    super()
    this.config = config
  }

  getUserTransactions(userId: ITransaction['user_id']) {
    return this.userTransactions.get(userId) || []
  }

  setTransactionToUser(transaction: ITransaction) {
    const userTransactions = this.getUserTransactions(transaction.user_id)
    userTransactions.unshift(transaction)
  }

  prepareUserTransactionsIfNotExists(userId: ITransaction['user_id']) {
    if (!this.userTransactions.has(userId)) {
      this.userTransactions.set(userId, [])
    }
  }

  calculate(transaction: ITransaction) {
    this.isCurrencySupported(transaction.operation.currency)
    const { user_id, operation } = transaction

    this.prepareUserTransactionsIfNotExists(user_id)

    const { weekLimitAmount, percents } = this.config
    const userTransactions = this.getUserTransactions(user_id)
    const userTotalAmountTransactionsOnThisWeekCurrent = this.getUserTotalAmountTransactionsByWeek(
      transaction.date,
      userTransactions,
    )
    const userTotalAmountTransactionsOnThisWeekUpdated = userTotalAmountTransactionsOnThisWeekCurrent + operation.amount
    const isExceededAmount = userTotalAmountTransactionsOnThisWeekUpdated > weekLimitAmount
    let amountLeftForFree = weekLimitAmount - userTotalAmountTransactionsOnThisWeekCurrent
    amountLeftForFree = amountLeftForFree > 0 ? amountLeftForFree : 0
    let transactionCommission = 0

    this.setTransactionToUser(transaction)

    if (isExceededAmount) {
      transactionCommission = ((operation.amount - amountLeftForFree) * percents) / 100
      return transactionCommission
    }

    return transactionCommission
  }

  getUserTotalAmountTransactionsByWeek(date: string, transactions: ITransaction[]) {
    let totalAmount = 0

    for (const transaction of transactions) {
      const isTransactionOnSameWeek = dateHelper.isSameWeek(new Date(date), new Date(transaction.date))

      // Date is already out of the week, iteration can be stopped
      if (!isTransactionOnSameWeek) {
        break
      }

      totalAmount += transaction.operation.amount
    }

    return totalAmount
  }
}
