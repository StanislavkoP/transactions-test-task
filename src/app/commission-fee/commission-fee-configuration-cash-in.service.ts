import { ICommissionFeeConfigCashIn } from './dto/comission-fee-configuration.dto'
import { CommissionFeeConfigCashInEntity } from './entities/comission-fee-configuration-cash-in.entity'
import { CommissionFeeConfigService } from './commission-fee-configuration.service'

export class CommissionFeeConfigCashInService extends CommissionFeeConfigService {
  async getConfig() {
    const response = await this._httpClient.get<ICommissionFeeConfigCashIn>(`${this.apiUrl}/cash-in`)

    return new CommissionFeeConfigCashInEntity(response.data)
  }
}
