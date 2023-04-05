import { AppConfigService } from '../app-config/app-config.service'

export abstract class CommissionFeeConfigService {
  protected _apiUrl = AppConfigService.get('COMMISSION_FEE_CONFIG_API_URL')

  get apiUrl() {
    if (!this._apiUrl) {
      throw new Error('Please provide COMMISSION_FEE_CONFIG_API_URL variable in .env')
    }

    return this._apiUrl
  }

  getConfig() {
    throw new Error('You need to implement a function')
  }
}
