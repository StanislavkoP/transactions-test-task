import process from 'process'
import dotenv from 'dotenv'

dotenv.config()

const configs = {
  COMMISSION_FEE_CONFIG_API_URL: process.env.COMMISSION_FEE_CONFIG_API_URL,
}

export class _AppConfigService {
  get<T = any>(name: keyof typeof configs): T {
    return configs[name] as T
  }
}

export const AppConfigService = new _AppConfigService()
