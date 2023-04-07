import { CURRENCY_TYPE_LIST } from '../../shared/constants/constants'
import { CalculationFeeService } from './calculation-fee.service'
import { CommissionFeeConfigCashInEntity } from '../commission-fee/entities/comission-fee-configuration-cash-in.entity'
import { CommissionFeeConfigCashOutLegalEntity } from '../commission-fee/entities/comission-fee-configuration-cash-out-legal.entity'
import { CommissionFeeConfigCashOutNaturalEntity } from '../commission-fee/entities/comission-fee-configuration-cash-out-natural.entity'
import { CalculationFeeStrategyManager } from './calculation-fee-strategies/calculation-fee-strategy-manager'

const mockCommissionFeeConfigCashIn = new CommissionFeeConfigCashInEntity({
  percents: 0.03,
  max: {
    amount: 5,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
})

const mockCommissionFeeConfigCashOutLegal = new CommissionFeeConfigCashOutLegalEntity({
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
})

const mockCommissionFeeConfigCashOutNatural = new CommissionFeeConfigCashOutNaturalEntity({
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
})

jest.mock('../transactions/transactions.service', () => {
  return {
    TransactionsService: jest.fn().mockImplementation(() => ({
      getAll: jest.fn().mockResolvedValue([]),
    })),
  }
})

jest.mock('../commission-fee/commission-fee-configuration-cash-in.service', () => {
  return {
    CommissionFeeConfigCashInService: jest.fn().mockImplementation(() => ({
      getConfig: jest.fn().mockResolvedValue(mockCommissionFeeConfigCashIn),
    })),
  }
})

jest.mock('../commission-fee/commission-fee-configuration-cash-out-legal.service', () => {
  return {
    CommissionFeeConfigCashOutLegalService: jest.fn().mockImplementation(() => ({
      getConfig: jest.fn().mockResolvedValue(mockCommissionFeeConfigCashOutLegal),
    })),
  }
})

jest.mock('../commission-fee/commission-fee-configuration-cash-out-natural.service', () => {
  return {
    CommissionFeeConfigCashOutNaturalService: jest.fn().mockImplementation(() => ({
      getConfig: jest.fn().mockResolvedValue(mockCommissionFeeConfigCashOutNatural),
    })),
  }
})

describe('CalculationFeeService', () => {
  const calculationFeeService = new CalculationFeeService()

  it('getFeeConfigs() should return correct configs', async () => {
    const configs = await calculationFeeService.getFeeConfigs()

    expect(configs).toEqual([
      mockCommissionFeeConfigCashIn,
      mockCommissionFeeConfigCashOutLegal,
      mockCommissionFeeConfigCashOutNatural,
    ])
  })

  it('getCalculationFeeStrategyManager() should return CalculationFeeStrategyManager', async () => {
    const strategyManager = await calculationFeeService.getCalculationFeeStrategyManager()

    expect(strategyManager).toBeInstanceOf(CalculationFeeStrategyManager)
  })

  it('calculateFee() should be fired with correct argument', async () => {
    const calculateFeeSpy = jest.spyOn(calculationFeeService, 'calculateFee')
    await calculationFeeService.calculateFee('input.json')

    expect(calculateFeeSpy).toHaveBeenCalledWith('input.json')
  })
})
