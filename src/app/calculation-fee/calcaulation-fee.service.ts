import { TransactionsService } from '../transactions/transactions.service'
import {
  CALCULATION_FEE_TYPE_LIST,
  CalculationFeeStrategyManager,
} from './calculation-fee-strategies/calculation-fee-strategy-manager'
import { CalculationFeeCashIn } from './calculation-fee-strategies/calculation-fee-cash-in'
import { CalculationFeeCashOutNatural } from './calculation-fee-strategies/calculation-fee-cash-out-natural'
import { CalculationFeeCashOutLegal } from './calculation-fee-strategies/calculation-fee-cash-out-legal'
import { CommissionFeeConfigCashInService } from '../commission-fee/commission-fee-configuration-cash-in.service'
import { CommissionFeeConfigCashOutLegalService } from '../commission-fee/commission-fee-configuration-cash-out-legal.service'
import { CommissionFeeConfigCashOutNaturalService } from '../commission-fee/commission-fee-configuration-cash-out-natural.service'
import { currencyHelper } from '../../shared/helpers/currency-helper'

export class CalculationFeeService {
  transactionsService = new TransactionsService()

  commissionFeeConfigCashInService = new CommissionFeeConfigCashInService()

  commissionFeeConfigCashOutLegalService = new CommissionFeeConfigCashOutLegalService()

  commissionFeeConfigCashOutNaturalService = new CommissionFeeConfigCashOutNaturalService()

  async calculateFee(dataFileName: string) {
    const transactions = await this.transactionsService.getAll(dataFileName)
    const calculationFeeStrategyManager = await this.getCalculationFeeStrategyManager()

    // Calculation fee of transactions
    const result: string[] = []

    for (const transaction of transactions) {
      const strategy = calculationFeeStrategyManager.computeStrategy(transaction)
      const calculatedFee = strategy.calculate(transaction)
      const roundedFee = currencyHelper.rounding(calculatedFee)
      const formattedFee = currencyHelper.baseFormat(roundedFee)

      result.push(formattedFee)
    }

    return result
  }

  async getCalculationFeeStrategyManager() {
    const [commissionFeeConfigCashIn, commissionFeeConfigCashOutLegal, commissionFeeConfigCashOutNatural] =
      await this.getFeeConfigs()

    // Set up calculation fee strategies
    const calculationFeeStrategyManager = new CalculationFeeStrategyManager()
    const strategies = [
      [CALCULATION_FEE_TYPE_LIST.cash_in, new CalculationFeeCashIn(commissionFeeConfigCashIn)],
      [CALCULATION_FEE_TYPE_LIST.cash_out_legal, new CalculationFeeCashOutLegal(commissionFeeConfigCashOutLegal)],
      [CALCULATION_FEE_TYPE_LIST.cash_out_natural, new CalculationFeeCashOutNatural(commissionFeeConfigCashOutNatural)],
    ] as const

    for (const [strategyName, strategy] of strategies) {
      calculationFeeStrategyManager.setStrategy(strategyName, strategy)
    }

    return calculationFeeStrategyManager
  }

  getFeeConfigs() {
    return Promise.all([
      this.commissionFeeConfigCashInService.getConfig(),
      this.commissionFeeConfigCashOutLegalService.getConfig(),
      this.commissionFeeConfigCashOutNaturalService.getConfig(),
    ])
  }
}
