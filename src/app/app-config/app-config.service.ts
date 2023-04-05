import process from 'process'
import { config } from 'dotenv'

config()

export class _AppConfigService {
  get<T = any>(name): T {
    return process.env[name] as T
  }
}

export const AppConfigService = new _AppConfigService()
