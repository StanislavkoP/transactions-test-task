import { CalculationFeeController } from './calculation-fee/calculation-fee.controller'

export class AppController {
  calculateFeeController = new CalculationFeeController()

  run(dataFileName: string) {
    this.calculateFeeController.calculate(dataFileName)
  }
}
