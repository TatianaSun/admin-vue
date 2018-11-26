import {http} from '../assets/js/http.js'
// 使用webpack打包的代码,某些Node模块在浏览器中也可以使用,例如path模块
// import path from 'path'

const baseURL = '/categories'
export default class Category {
  constructor (c) {
    // this在构造函数中就是实例本身
    this.cat_pid = c.cat_pid
    this.cat_name = c.cat_name
    this.cat_level = c.cat_level
  }
  save () {
    return http.post(baseURL, this)
  }
  // 调用的时候就new Category({xxx}).save()

  static findbyType (condition) {
    return http.get(baseURL, {
      params: {
        type: condition.type,
        pagenum: condition.pagenum,
        pagesize: condition.pagesize
      }
    })
  }

  static findbyId (id) {
    // return http.get(path.join(baseURL, id))
    return http.get(`${baseURL}/${id}`)
  }

  static updateById (id, category) {
    return http.put(`${baseURL}/${id}`, {
      cat_name: category.cat_name
    })
  }

  static deleteById (id) {
    return http.delete(`${baseURL}/${id}`)
  }
}
