import axios from 'axios'

const endpoint = 'http://localhost:8001'

const fetch = axios.create({
  baseURL: endpoint,
})
export default fetch
