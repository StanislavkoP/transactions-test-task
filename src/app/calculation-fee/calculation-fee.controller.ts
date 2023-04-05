import { CalculationFeeService } from './calcaulation-fee.service'
import { outputHelper } from '../../shared/helpers/output-helper'

export class CalculationFeeController {
  calculateFeeService: CalculationFeeService

  constructor() {
    this.calculateFeeService = new CalculationFeeService()
  }

  async calculate(dataFileName: string) {
    const result = await this.calculateFeeService.calculateFee(dataFileName)

    outputHelper(result.join('\n'))
  }
}
