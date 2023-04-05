import { readLocalFile } from '../../shared/helpers/read-local-file'
import { ITransaction } from '../../shared/types/transaction'

export class TransactionsService {
  async getAll(dataFileName: string) {
    const transactionsFileData = await readLocalFile(dataFileName)

    if (!transactionsFileData) {
      throw new Error(`File with a name ${dataFileName} is empty`)
    }

    const transactions: { data: ITransaction[] } = JSON.parse(transactionsFileData)

    if (!transactions.data?.length) {
      throw new Error(`Transaction list is empty`)
    }

    return transactions.data
  }
}
