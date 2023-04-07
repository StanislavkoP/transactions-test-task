import * as fileModule from './read-transactions-file'

jest.mock('fs/promises')

describe(fileModule.readTransactionsFile, () => {
  const inputFileName = 'input.json'

  it(`should be called with argument=${inputFileName}`, async () => {
    const readTransactionsFileSpy = jest.spyOn(fileModule, 'readTransactionsFile').mockResolvedValue([])
    await fileModule.readTransactionsFile(inputFileName)

    expect(readTransactionsFileSpy).toHaveBeenCalledWith(inputFileName)
  })
})
