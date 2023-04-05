import currency from 'currency.js'

export const currencyHelper = {
  rounding: (amount: number) => Math.ceil(amount * 100) / 100,
  baseFormat: (amount: number) => currency(amount, { precision: 2 }).format({ symbol: '', increment: 0.08 }),
}
