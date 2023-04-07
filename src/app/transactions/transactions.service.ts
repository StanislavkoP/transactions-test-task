import { readTransactionsFile } from '../../shared/helpers/read-transactions-file/read-transactions-file'

export class TransactionsService {
  async getAll(dataFileName: string) {
    const transactions = await readTransactionsFile(dataFileName)

    return transactions
  }
}
