import { CommissionFeeConfigCashInEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-in.entity'
import { ITransaction } from '../../../shared/types/transaction'
import { CalculationFeeBase } from './calculation-fee-base'

export class CalculationFeeCashIn extends CalculationFeeBase {
  private config: CommissionFeeConfigCashInEntity

  constructor(config: CommissionFeeConfigCashInEntity) {
    super()
    this.config = config
  }

  calculate(transaction: ITransaction) {
    this.isCurrencySupported(transaction.operation.currency)
    const commission = (transaction.operation.amount * this.config.percents) / 100

    return commission > this.config.maxAmount ? this.config.maxAmount : commission
  }
}
