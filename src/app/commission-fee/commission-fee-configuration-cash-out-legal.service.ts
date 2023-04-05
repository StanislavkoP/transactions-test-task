import { HttpClient } from '../../shared/helpers/http-client'
import { ICommissionFeeConfigCashOutLegal } from './dto/comission-fee-configuration.dto'
import { CommissionFeeConfigCashOutLegalEntity } from './entities/comission-fee-configuration-cash-out-legal.entity'
import { CommissionFeeConfigService } from './commission-fee-configuration.service'

export class CommissionFeeConfigCashOutLegalService extends CommissionFeeConfigService {
  async getConfig() {
    const response = await HttpClient.get<ICommissionFeeConfigCashOutLegal>(`${this.apiUrl}/cash-out-juridical`)

    return new CommissionFeeConfigCashOutLegalEntity(response.data)
  }
}
