import { TransactionsService } from './transactions.service'
import { ITransaction } from '../../shared/types/transaction'

const dummyTransactions: ITransaction[] = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
]

jest.mock('../../shared/helpers/read-transactions-file/read-transactions-file', () => {
  return {
    readTransactionsFile: () => jest.fn().mockReturnValue(dummyTransactions),
  }
})

describe('TransactionsService', () => {
  let transactionsService: TransactionsService
  const inputFileName = 'input.json'

  beforeEach(() => {
    jest.resetAllMocks()
    transactionsService = new TransactionsService()
  })

  it('should be defined', () => {
    expect(transactionsService).toBeDefined()
  })

  it('json file name should be defined', () => {
    expect(inputFileName).toBeDefined()
  })

  test(`getAll() method should be fired with ${inputFileName} argument`, async () => {
    const getAllSpy = jest.spyOn(transactionsService, 'getAll')

    await transactionsService.getAll(inputFileName)

    expect(getAllSpy).toHaveBeenCalledWith(inputFileName)
  })

  test(`getAll() should return a transaction list`, async () => {
    jest.spyOn(transactionsService, 'getAll').mockResolvedValue(dummyTransactions)

    const transactions = await transactionsService.getAll(inputFileName)

    expect(transactions).toEqual(dummyTransactions)
  })
})
