import process from 'process'

export const outputHelper = (value: string) => {
  process.stdout.write(value)
}
