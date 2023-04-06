import { ICommissionFeeConfigCashOutLegal } from '../dto/comission-fee-configuration.dto'

export class CommissionFeeConfigCashOutLegalEntity {
  private config: ICommissionFeeConfigCashOutLegal

  constructor(config: ICommissionFeeConfigCashOutLegal) {
    this.config = config
  }

  get percents() {
    return this.config.percents
  }

  get minAmount() {
    return this.config.min.amount
  }
}
