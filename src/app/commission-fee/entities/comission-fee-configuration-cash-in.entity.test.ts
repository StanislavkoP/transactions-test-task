import { CURRENCY_TYPE_LIST } from '../../../shared/constants/constants'
import { CommissionFeeConfigCashInEntity } from './comission-fee-configuration-cash-in.entity'
import { ICommissionFeeConfigCashIn } from '../dto/comission-fee-configuration.dto'

const config: ICommissionFeeConfigCashIn = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

describe('CommissionFeeConfigCashInEntity', () => {
  const entity = new CommissionFeeConfigCashInEntity(config)

  it('should return percents from config', () => {
    expect(entity.percents).toEqual(config.percents)
  })

  it('should return maxAmount from config', () => {
    expect(entity.maxAmount).toEqual(entity.maxAmount)
  })
})
