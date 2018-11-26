/**
 * 封装axios实例,注入到Vue的原型中
 */
import axios from 'axios'
import { getToken } from './auth.js'
import router from '@/router/index.js'

export const http = axios.create({
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
// 添加响应拦截器
// 例如对每个接口进行403权限认证判断,如果相应数据是403,提示用户,没有权限操作
http.interceptors.response.use(function (response) {
  // console.log(response)
  const {meta} = response.data
  if (meta.status === 403) {
    window.alert('您没有权限进行该操作')
  } else if (meta.status === 401) {
    // 401 表示没有token或者token无效,比如伪造的token
    // window.location.href = '#/login'
    router.push({
      name: 'login',
      query: {
        redirect: window.location.hash // 重定向到页面token失效时的页面
      }
    })
  }
  return response // 非常重要,类似于next()
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
