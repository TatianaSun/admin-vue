/**
 * 封装axios实例,注入到Vue的原型中
 */
import axios from 'axios'
import { getToken } from './auth.js'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // console.log(config)
  // 在这里通过config 为请求配置选项.比如header
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }
  // 允许通过 return config 就相当于 next()
  return config
}, function (error) {
  return Promise.reject(error)
})

// 通过定义插件的配置来扩展Vue
const httpPlugin = {}
httpPlugin.install = function (Vue, options) {
  // 添加实例方法
  Vue.prototype.$http = http
}
export default httpPlugin
