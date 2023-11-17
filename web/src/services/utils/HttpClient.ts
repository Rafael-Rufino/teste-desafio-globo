import axios, { AxiosError, AxiosResponse } from 'axios'

class HttpClient {
  private readonly baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get<T>(path: string): Promise<T> {
    const url = `${this.baseURL}${path}`

    try {
      const response: AxiosResponse<T> = await axios.get(url)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      return Promise.reject(
        `Erro na requisição GET para ${url}: ${axiosError.message}`
      )
    }
  }
}

export default HttpClient
