import axios from 'axios'

const PORT = 8001

const endpoint = `http://localhost:${PORT}`

const fetch = axios.create({
  baseURL: endpoint,
})
export default fetch
