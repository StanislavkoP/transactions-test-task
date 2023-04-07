import { CalculationFeeCashIn } from './calculation-fee-cash-in'
import { CalculationFeeCashOutLegal } from './calculation-fee-cash-out-legal'
import { CalculationFeeCashOutNatural } from './calculation-fee-cash-out-natural'
import { TRANSACTION_TYPE_LIST, USER_TYPE_LIST } from '../../../shared/constants/constants'
import { ValueOf } from '../../../shared/types/type-helpers'
import { ITransaction } from '../../../shared/types/transaction'

export const CALCULATION_FEE_TYPE_LIST = {
  cash_in: 'cash_in',
  cash_out_legal: 'cash_out_legal',
  cash_out_natural: 'cash_out_natural',
}

type CalculationFeeTypes = ValueOf<typeof CALCULATION_FEE_TYPE_LIST>

export class CalculationFeeStrategyManager {
  _strategies: Record<
    CalculationFeeTypes,
    CalculationFeeCashIn | CalculationFeeCashOutLegal | CalculationFeeCashOutNatural | null
  > = {
    [CALCULATION_FEE_TYPE_LIST.cash_in]: null,
    [CALCULATION_FEE_TYPE_LIST.cash_out_legal]: null,
    [CALCULATION_FEE_TYPE_LIST.cash_out_natural]: null,
  }

  get strategies() {
    return this._strategies
  }

  setStrategy(
    name: CalculationFeeTypes,
    strategy: CalculationFeeCashIn | CalculationFeeCashOutLegal | CalculationFeeCashOutNatural,
  ) {
    this._strategies[name] = strategy
  }

  getStrategy(name: CalculationFeeTypes) {
    const strategy = this._strategies[name]

    if (strategy === null) {
      throw new Error('Calculation fee strategy not set up')
    }

    if (!(name in this._strategies)) {
      throw new Error('Calculation fee strategy don`t exists')
    }

    return strategy
  }

  computeStrategy(
    transaction: ITransaction,
  ): CalculationFeeCashIn | CalculationFeeCashOutLegal | CalculationFeeCashOutNatural {
    if (transaction.type === TRANSACTION_TYPE_LIST.cash_in) {
      return this.getStrategy(CALCULATION_FEE_TYPE_LIST.cash_in)
    }

    if (transaction.type === TRANSACTION_TYPE_LIST.cash_out && transaction.user_type === USER_TYPE_LIST.juridical) {
      return this.getStrategy(CALCULATION_FEE_TYPE_LIST.cash_out_legal)
    }

    if (transaction.type === TRANSACTION_TYPE_LIST.cash_out && transaction.user_type === USER_TYPE_LIST.natural) {
      return this.getStrategy(CALCULATION_FEE_TYPE_LIST.cash_out_natural)
    }

    throw new Error(`Calculation fee strategy has not been found for ${JSON.stringify(transaction)}`)
  }
}
