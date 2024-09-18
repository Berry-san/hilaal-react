import axios from 'axios'
import { API_BASE } from '../middleware/API_BASE'

const axiosInstance = axios.create({
  baseURL: API_BASE,
  // baseURL: '/api',
  headers: {
    'x-api-key': 987655,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export default axiosInstance
