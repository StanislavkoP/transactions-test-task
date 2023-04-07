import { CommissionFeeConfigCashInService } from './commission-fee-configuration-cash-in.service'
import { ICommissionFeeConfigCashIn } from './dto/comission-fee-configuration.dto'
import { CURRENCY_TYPE_LIST } from '../../shared/constants/constants'
import { CommissionFeeConfigCashInEntity } from './entities/comission-fee-configuration-cash-in.entity'

const mockConfig: ICommissionFeeConfigCashIn = {
  percents: 0.03,
  max: {
    amount: 5,
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

describe('CommissionFeeConfigCashInService', () => {
  const commissionFeeConfigCashInService = new CommissionFeeConfigCashInService()

  it('getConfig() should return CommissionFeeConfigCashInEntity', async () => {
    const result = await commissionFeeConfigCashInService.getConfig()

    expect(result).toBeInstanceOf(CommissionFeeConfigCashInEntity)
  })
})
