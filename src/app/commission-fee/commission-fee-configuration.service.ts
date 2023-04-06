import { AppConfigService } from '../app-config/app-config.service'
import { HttpClient } from '../../shared/helpers/http-client'

export class CommissionFeeConfigService {
  protected _apiUrl = AppConfigService.get('COMMISSION_FEE_CONFIG_API_URL')

  protected _httpClient = HttpClient

  get apiUrl() {
    if (!this._apiUrl) {
      throw new Error('Please provide apiUrl')
    }

    return this._apiUrl
  }

  getConfig() {
    throw new Error('You need to implement a function')
  }
}
