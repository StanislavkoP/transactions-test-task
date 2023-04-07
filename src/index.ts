import { argv } from 'node:process'
import { AppController } from './app/app.controller'

export function bootstrap() {
  const [, , dataFileName] = argv

  if (!dataFileName) {
    throw new Error('Provide a file name with data transactions')
  }

  new AppController().run(dataFileName)
}

bootstrap()
