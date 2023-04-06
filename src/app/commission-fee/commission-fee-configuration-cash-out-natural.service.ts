import { ICommissionFeeConfigCashOutNatural } from './dto/comission-fee-configuration.dto'
import { CommissionFeeConfigCashOutNaturalEntity } from './entities/comission-fee-configuration-cash-out-natural.entity'
import { CommissionFeeConfigService } from './commission-fee-configuration.service'

export class CommissionFeeConfigCashOutNaturalService extends CommissionFeeConfigService {
  async getConfig() {
    const response = await this._httpClient.get<ICommissionFeeConfigCashOutNatural>(`${this.apiUrl}/cash-out-natural`)

    return new CommissionFeeConfigCashOutNaturalEntity(response.data)
  }
}
