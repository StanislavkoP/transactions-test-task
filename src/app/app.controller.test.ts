import { AppController } from './app.controller'

jest.mock('./calculation-fee/calculation-fee.controller')

describe('AppController', () => {
  let appController: AppController
  const inputFileName = 'input.json'

  beforeEach(() => {
    jest.resetAllMocks()
    appController = new AppController()
  })

  it('should be defined', () => {
    expect(appController).toBeDefined()
  })

  test(`run() method should be fired with ${inputFileName} argument`, () => {
    const runSpy = jest.spyOn(appController, 'run')

    appController.run(inputFileName)

    expect(runSpy).toHaveBeenCalledWith(inputFileName)
  })
})
