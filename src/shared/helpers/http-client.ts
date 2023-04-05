import { axios } from '../../configs/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

type Response<T = any, D = any> = AxiosResponse<T, D>
type HttpClientRequestConfig<D = any> = AxiosRequestConfig<D>

export class _HttpClient {
  client = axios

  async get<T = any, R = Response<T>, D = any>(url: string, config?: HttpClientRequestConfig<D>): Promise<R> {
    const response = await this.client.get(url, config)

    return response as unknown as Promise<R>
  }
}

export const HttpClient = new _HttpClient()
