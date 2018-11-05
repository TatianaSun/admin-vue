/**
 * 封装axios实例,注入到Vue的原型中
 */
import axios from 'axios'

// 通过定义插件的配置来扩展Vue

const httpPlugin = {}
httpPlugin.install = function (Vue, options) {
  // 添加实例方法
  Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  })
}
export default httpPlugin
