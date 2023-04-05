import { ValueOf } from './type-helpers'
import { CURRENCY_TYPE_LIST } from '../constants/constants'

export type CurrencyTypes = ValueOf<typeof CURRENCY_TYPE_LIST>
