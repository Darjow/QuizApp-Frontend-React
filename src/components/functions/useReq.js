import axios from "axios"
import config from "../../config.json"


const baseConfig = () => {
  const token = `Bearer ${localStorage.getItem(config.token_key)}`
  const baseURL = config.base_url

  return {
    baseURL,
    headers: { Authorization: token, "Content-Type": "application/json" },
    withCredentials: false,
  }
}

export const simpleReq = (url, method = "GET", data) => {
  const additionalArgs = {}
  if (data) additionalArgs.data = JSON.stringify(data)
  return axios({ ...baseConfig(), url: url, method: method, ...additionalArgs })
}