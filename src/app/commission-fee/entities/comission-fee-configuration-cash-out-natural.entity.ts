import { ICommissionFeeConfigCashOutNatural } from '../dto/comission-fee-configuration.dto'

export class CommissionFeeConfigCashOutNaturalEntity {
  private config: ICommissionFeeConfigCashOutNatural

  constructor(config: ICommissionFeeConfigCashOutNatural) {
    this.config = config
  }

  get percents() {
    return this.config.percents
  }

  get weekLimitAmount() {
    return this.config.week_limit.amount
  }
}
