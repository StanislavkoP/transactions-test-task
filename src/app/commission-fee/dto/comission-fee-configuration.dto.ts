import { CurrencyTypes } from '../../../shared/types/currency'

export interface ICommissionFeeConfigCashIn {
  percents: number
  max: {
    amount: number
    currency: CurrencyTypes
  }
}

export interface ICommissionFeeConfigCashOutNatural {
  percents: number
  week_limit: {
    amount: number
    currency: CurrencyTypes
  }
}

export interface ICommissionFeeConfigCashOutLegal {
  percents: number
  min: {
    amount: number
    currency: CurrencyTypes
  }
}
