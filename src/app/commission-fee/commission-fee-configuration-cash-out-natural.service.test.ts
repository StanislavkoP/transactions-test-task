import { CommissionFeeConfigCashOutNaturalService } from './commission-fee-configuration-cash-out-natural.service'
import { ICommissionFeeConfigCashOutNatural } from './dto/comission-fee-configuration.dto'
import { CURRENCY_TYPE_LIST } from '../../shared/constants/constants'
import { CommissionFeeConfigCashOutNaturalEntity } from './entities/comission-fee-configuration-cash-out-natural.entity'

const mockConfig: ICommissionFeeConfigCashOutNatural = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

jest.mock('../../shared/helpers/http-client', () => {
  return {
    HttpClient: {
      get: () => jest.fn().mockResolvedValue({ data: mockConfig }),
    },
  }
})

describe('CommissionFeeConfigCashOutNaturalService', () => {
  const commissionFeeConfigCashOutLegalService = new CommissionFeeConfigCashOutNaturalService()

  it('getConfig() should return CommissionFeeConfigCashOutNaturalEntity', async () => {
    const result = await commissionFeeConfigCashOutLegalService.getConfig()

    expect(result).toBeInstanceOf(CommissionFeeConfigCashOutNaturalEntity)
  })
})
