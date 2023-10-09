import axios from 'axios'

const PORT = 8001
const fallbackPort = 3333

const endpoint = `http://localhost:${PORT || fallbackPort}`

const fetch = axios.create({
  baseURL: endpoint,
})
export default fetch
