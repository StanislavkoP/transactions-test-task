import { AppConfigService } from './app-config.service'

describe('AppConfigService', () => {
  it('should be defined', () => {
    expect(AppConfigService).toBeDefined()
  })

  it('get() should be defined', () => {
    expect(typeof AppConfigService.get).toBe('function')
  })

  it('get() should be called with COMMISSION_FEE_CONFIG_API_URL argument', () => {
    const getSpy = jest.spyOn(AppConfigService, 'get')

    AppConfigService.get('COMMISSION_FEE_CONFIG_API_URL')

    expect(getSpy).toHaveBeenCalledWith('COMMISSION_FEE_CONFIG_API_URL')
  })

  it('get() should return a domain by COMMISSION_FEE_CONFIG_API_URL env variable', () => {
    process.env.COMMISSION_FEE_CONFIG_API_URL = 'api-example.com'

    const result = AppConfigService.get('COMMISSION_FEE_CONFIG_API_URL')

    expect(result).toEqual('api-example.com')
  })
})
