import process from 'process'
import * as outputHelpers from './output-helper'

describe('outputHelper', () => {
  it('should be called with correct argument', () => {
    const outputHelperSpy = jest.spyOn(outputHelpers, 'outputHelper')

    outputHelpers.outputHelper('test output')

    expect(outputHelperSpy).toHaveBeenCalledWith('test output')
  })

  it('should call process.stdout inside', () => {
    const stdoutSpy = jest.spyOn(process.stdout, 'write')

    outputHelpers.outputHelper('test output')

    expect(stdoutSpy).toHaveBeenCalledWith('test output')
  })
})
