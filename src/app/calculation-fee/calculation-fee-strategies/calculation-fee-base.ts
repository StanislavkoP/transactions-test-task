import { CurrencyTypes } from '../../../shared/types/currency'
import { CURRENCY_TYPE_LIST } from '../../../shared/constants/constants'

const SUPPORTED_CURRENCIES = [CURRENCY_TYPE_LIST.EUR]

export class CalculationFeeBase {
  isCurrencySupported(currency: CurrencyTypes) {
    if (!SUPPORTED_CURRENCIES.includes(currency)) {
      throw new Error(`${currency} is not supported for calculation fee`)
    }
  }
}
