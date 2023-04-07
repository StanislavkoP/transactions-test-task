import fsSync from 'fs'
import fs from 'fs/promises'
import path from 'node:path'
import { ITransaction } from '../../types/transaction'

export async function readTransactionsFile(name: string): Promise<ITransaction[]> {
  const filePath = path.join(__dirname, `../assets/${name}`)
  const isFileExists = fsSync.existsSync(filePath)

  if (!isFileExists) {
    throw new Error(`File not exists by ${filePath}`)
  }

  const data = await fs.readFile(filePath, 'utf-8')

  if (!data) {
    throw new Error(`File with a name ${name} is empty`)
  }

  const transactions: { data: ITransaction[] } = JSON.parse(data)

  if (!transactions.data?.length) {
    throw new Error(`Transaction list is empty`)
  }

  return transactions.data
}
