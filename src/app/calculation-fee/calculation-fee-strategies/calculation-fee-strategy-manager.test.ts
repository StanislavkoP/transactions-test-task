import { CURRENCY_TYPE_LIST } from '../../../shared/constants/constants'
import { CALCULATION_FEE_TYPE_LIST, CalculationFeeStrategyManager } from './calculation-fee-strategy-manager'
import { CalculationFeeCashIn } from './calculation-fee-cash-in'
import { CalculationFeeCashOutNatural } from './calculation-fee-cash-out-natural'
import { CalculationFeeCashOutLegal } from './calculation-fee-cash-out-legal'
import {
  ICommissionFeeConfigCashIn,
  ICommissionFeeConfigCashOutLegal,
  ICommissionFeeConfigCashOutNatural,
} from '../../commission-fee/dto/comission-fee-configuration.dto'
import { CommissionFeeConfigCashInEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-in.entity'
import { CommissionFeeConfigCashOutLegalEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-out-legal.entity'
import { CommissionFeeConfigCashOutNaturalEntity } from '../../commission-fee/entities/comission-fee-configuration-cash-out-natural.entity'

const commissionFeeConfigCashIn: ICommissionFeeConfigCashIn = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

const commissionFeeConfigCashOutLegal: ICommissionFeeConfigCashOutLegal = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

const commissionFeeConfigCashOutNatural: ICommissionFeeConfigCashOutNatural = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

const strategies = {
  [CALCULATION_FEE_TYPE_LIST.cash_in]: new CalculationFeeCashIn(
    new CommissionFeeConfigCashInEntity(commissionFeeConfigCashIn),
  ),
  [CALCULATION_FEE_TYPE_LIST.cash_out_legal]: new CalculationFeeCashOutLegal(
    new CommissionFeeConfigCashOutLegalEntity(commissionFeeConfigCashOutLegal),
  ),
  [CALCULATION_FEE_TYPE_LIST.cash_out_natural]: new CalculationFeeCashOutNatural(
    new CommissionFeeConfigCashOutNaturalEntity(commissionFeeConfigCashOutNatural),
  ),
} as const

describe('CalculationFeeStrategyManager', () => {
  const calculationFeeStrategyManager = new CalculationFeeStrategyManager()

  beforeAll(() => {
    for (const strategyName in strategies) {
      if (strategyName in strategies) {
        const strategy = strategies[strategyName]
        calculationFeeStrategyManager.setStrategy(strategyName, strategy)
      }
    }
  })

  it('should have correct strategy list', () => {
    expect(calculationFeeStrategyManager.strategies).toEqual(strategies)
  })

  it('getStrategy() should return correct strategy', () => {
    const strategy = calculationFeeStrategyManager.getStrategy(CALCULATION_FEE_TYPE_LIST.cash_in)

    expect(strategy).toEqual(strategies[CALCULATION_FEE_TYPE_LIST.cash_in])
  })

  it('getStrategy() should return error if strategy is null', () => {
    const calculationFeeStrategyManager = new CalculationFeeStrategyManager()

    try {
      calculationFeeStrategyManager.getStrategy(CALCULATION_FEE_TYPE_LIST.cash_in)
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it('getStrategy() should return error if strategy not exists in the list', () => {
    const calculationFeeStrategyManager = new CalculationFeeStrategyManager()

    try {
      calculationFeeStrategyManager.getStrategy('dummy')
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  describe('computeStrategy() should return correct strategy instance', () => {
    it('should return  CalculationFeeCashIn', () => {
      const strategy = calculationFeeStrategyManager.computeStrategy({
        date: '2016-01-10',
        user_id: 2,
        user_type: 'juridical',
        type: 'cash_in',
        operation: { amount: 300.0, currency: 'EUR' },
      })

      expect(strategy).toBeInstanceOf(CalculationFeeCashIn)
    })

    it('should return  CalculationFeeCashOutNatural', () => {
      const strategy = calculationFeeStrategyManager.computeStrategy({
        date: '2016-01-07',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 100.0, currency: 'EUR' },
      })

      expect(strategy).toBeInstanceOf(CalculationFeeCashOutNatural)
    })

    it('should return  CalculationFeeCashOutLegal', () => {
      const strategy = calculationFeeStrategyManager.computeStrategy({
        date: '2016-01-07',
        user_id: 1,
        user_type: 'juridical',
        type: 'cash_out',
        operation: { amount: 100.0, currency: 'EUR' },
      })

      expect(strategy).toBeInstanceOf(CalculationFeeCashOutLegal)
    })
  })
})
