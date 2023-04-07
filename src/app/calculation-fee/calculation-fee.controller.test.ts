import { CalculationFeeController } from './calculation-fee.controller'

describe('CalculationFeeController', () => {
  const calculationFeeController = new CalculationFeeController()
  const inputFileName = 'input.json'

  it('should be defined', () => {
    expect(calculationFeeController).toBeDefined()
  })

  test(`calculate() method should be fired with ${inputFileName} argument`, () => {
    calculationFeeController.calculate = jest.fn()
    const runSpy = jest.spyOn(calculationFeeController, 'calculate')

    calculationFeeController.calculate(inputFileName)

    expect(runSpy).toHaveBeenCalledWith(inputFileName)
  })
})
