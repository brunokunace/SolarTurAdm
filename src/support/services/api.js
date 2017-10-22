import axios from 'axios'
import { URL_API } from 'src/support'
import { loading } from 'src/support/message'

const request = config => {
  // noinspection JSUnresolvedVariable
  if (!config.noLoading) {
    loading(true)
  }
  return config
}

const response = response => {
  loading(false)
  return response
}

const error = error => {
  loading(false)
  return Promise.reject(error)
}

const api = axios.create({
  baseURL: URL_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(request)

api.interceptors.response.use(response, error)

export default api
