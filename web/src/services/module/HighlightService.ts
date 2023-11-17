import { IHighlight } from '../../entities'
import HttpClient from '../utils/HttpClient'

class HighlightService {
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:8001')
  }

  async listHighlights() {
    return this.httpClient.get<{ highlights: IHighlight[] }>('/highlights')
  }
}

export default new HighlightService()
