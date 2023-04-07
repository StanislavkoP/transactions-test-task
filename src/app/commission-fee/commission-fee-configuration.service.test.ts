import { CommissionFeeConfigService } from './commission-fee-configuration.service'

process.env.COMMISSION_FEE_CONFIG_API_URL = 'fake-api.com'

describe('CommissionFeeConfigService', () => {
  const commissionFeeConfigService = new CommissionFeeConfigService()

  it('should be defined', () => {
    expect(commissionFeeConfigService).toBeDefined()
  })

  it('should return apiUrl value', () => {
    expect(commissionFeeConfigService.apiUrl).toBe('fake-api.com')
  })

  it('getConfig() should be defined', () => {
    expect(typeof commissionFeeConfigService.getConfig).toBe('function')
  })
})
