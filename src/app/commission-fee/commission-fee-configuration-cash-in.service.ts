import { HttpClient } from '../../shared/helpers/http-client'
import { ICommissionFeeConfigCashIn } from './dto/comission-fee-configuration.dto'
import { CommissionFeeConfigCashInEntity } from './entities/comission-fee-cash-in-configuration.entity'
import { CommissionFeeConfigService } from './commission-fee-configuration.service'

export class CommissionFeeConfigCashInService extends CommissionFeeConfigService {
  async getConfig() {
    const response = await HttpClient.get<ICommissionFeeConfigCashIn>(`${this.apiUrl}/cash-in`)

    return new CommissionFeeConfigCashInEntity(response.data)
  }
}
