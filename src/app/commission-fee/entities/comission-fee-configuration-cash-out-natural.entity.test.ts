import { CURRENCY_TYPE_LIST } from '../../../shared/constants/constants'
import { ICommissionFeeConfigCashOutNatural } from '../dto/comission-fee-configuration.dto'
import { CommissionFeeConfigCashOutNaturalEntity } from './comission-fee-configuration-cash-out-natural.entity'

const config: ICommissionFeeConfigCashOutNatural = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

describe('CommissionFeeConfigCashOutNaturalEntity', () => {
  const entity = new CommissionFeeConfigCashOutNaturalEntity(config)

  it('should return percents from config', () => {
    expect(entity.percents).toEqual(config.percents)
  })

  it('should return weekLimitAmount from config', () => {
    expect(entity.weekLimitAmount).toEqual(entity.weekLimitAmount)
  })
})
