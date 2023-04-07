import { CommissionFeeConfigCashOutLegalService } from './commission-fee-configuration-cash-out-legal.service'
import { ICommissionFeeConfigCashOutLegal } from './dto/comission-fee-configuration.dto'
import { CURRENCY_TYPE_LIST } from '../../shared/constants/constants'
import { CommissionFeeConfigCashOutLegalEntity } from './entities/comission-fee-configuration-cash-out-legal.entity'

const mockConfig: ICommissionFeeConfigCashOutLegal = {
  percents: 0.3,
  min: {
    amount: 0.5,
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

describe('CommissionFeeConfigCashOutLegalService', () => {
  const commissionFeeConfigCashOutLegalService = new CommissionFeeConfigCashOutLegalService()

  it('getConfig() should return CommissionFeeConfigCashOutLegalEntity', async () => {
    const result = await commissionFeeConfigCashOutLegalService.getConfig()

    expect(result).toBeInstanceOf(CommissionFeeConfigCashOutLegalEntity)
  })
})
