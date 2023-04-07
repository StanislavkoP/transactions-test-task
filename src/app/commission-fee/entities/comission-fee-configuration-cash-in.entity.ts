import { ICommissionFeeConfigCashIn } from '../dto/comission-fee-configuration.dto'

export class CommissionFeeConfigCashInEntity {
  private config: ICommissionFeeConfigCashIn

  constructor(config: ICommissionFeeConfigCashIn) {
    this.config = config
  }

  get percents() {
    return this.config.percents
  }

  get maxAmount() {
    return this.config.max.amount
  }
}
