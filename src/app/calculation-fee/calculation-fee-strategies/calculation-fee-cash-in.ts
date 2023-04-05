import { CommissionFeeConfigCashInEntity } from '../../commission-fee/entities/comission-fee-cash-in-configuration.entity'
import { ITransaction } from '../../../shared/types/transaction'

export class CalculationFeeCashIn {
  private config: CommissionFeeConfigCashInEntity

  constructor(config: CommissionFeeConfigCashInEntity) {
    this.config = config
  }

  calculate(transaction: ITransaction) {
    const commission = (transaction.operation.amount * this.config.percents) / 100

    return commission > this.config.maxAmount ? this.config.maxAmount : commission
  }
}
