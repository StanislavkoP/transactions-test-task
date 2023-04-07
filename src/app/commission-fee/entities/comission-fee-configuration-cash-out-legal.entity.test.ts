import { CURRENCY_TYPE_LIST } from '../../../shared/constants/constants'
import { ICommissionFeeConfigCashOutLegal } from '../dto/comission-fee-configuration.dto'
import { CommissionFeeConfigCashOutLegalEntity } from './comission-fee-configuration-cash-out-legal.entity'

const config: ICommissionFeeConfigCashOutLegal = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: CURRENCY_TYPE_LIST.EUR,
  },
}

describe('CommissionFeeConfigCashOutLegalEntity', () => {
  const entity = new CommissionFeeConfigCashOutLegalEntity(config)

  it('should return percents from config', () => {
    expect(entity.percents).toEqual(config.percents)
  })

  it('should return minAmount from config', () => {
    expect(entity.minAmount).toEqual(entity.minAmount)
  })
})
