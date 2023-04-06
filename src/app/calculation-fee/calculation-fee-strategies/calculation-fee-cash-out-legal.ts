import { CommissionFeeConfigCashOutLegalEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-out-legal.entity'
import { ITransaction } from '../../../shared/types/transaction'

export class CalculationFeeCashOutLegal {
  private config: CommissionFeeConfigCashOutLegalEntity

  constructor(config: CommissionFeeConfigCashOutLegalEntity) {
    this.config = config
  }

  calculate(transaction: ITransaction) {
    const commission = (transaction.operation.amount * this.config.percents) / 100

    if (commission < this.config.minAmount) {
      return this.config.minAmount
    }

    return commission
  }
}
