import { ISuggestion } from '../../entities'
import HttpClient from '../utils/HttpClient'

class SuggestionService {
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:8001')
  }

  async listSuggestions() {
    return this.httpClient.get<{ suggestions: ISuggestion[] }>('/suggestions')
  }
}

export default new SuggestionService()
