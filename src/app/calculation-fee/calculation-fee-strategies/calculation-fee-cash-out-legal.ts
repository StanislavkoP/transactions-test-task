import { CommissionFeeConfigCashOutLegalEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-out-legal.entity'
import { ITransaction } from '../../../shared/types/transaction'
import { CalculationFeeBase } from './calculation-fee-base'

export class CalculationFeeCashOutLegal extends CalculationFeeBase {
  private config: CommissionFeeConfigCashOutLegalEntity

  constructor(config: CommissionFeeConfigCashOutLegalEntity) {
    super()
    this.config = config
  }

  calculate(transaction: ITransaction) {
    this.isCurrencySupported(transaction.operation.currency)
    const commission = (transaction.operation.amount * this.config.percents) / 100

    if (commission < this.config.minAmount) {
      return this.config.minAmount
    }

    return commission
  }
}
