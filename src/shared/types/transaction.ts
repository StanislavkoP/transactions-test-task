import { ValueOf } from './type-helpers'
import { TRANSACTION_TYPE_LIST } from '../constants/constants'
import { CurrencyTypes } from './currency'
import { UserTypes } from './user'

export type TransactionTypes = ValueOf<typeof TRANSACTION_TYPE_LIST>

interface ITransactionOperation {
  amount: number
  currency: CurrencyTypes
}

export interface ITransaction {
  date: string // '2016-02-15'
  user_id: number
  user_type: UserTypes
  type: TransactionTypes
  operation: ITransactionOperation
}
