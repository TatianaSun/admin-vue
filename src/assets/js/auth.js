/**
 * 自定义业务函数模块
 * auth.js
 * 封装一些和用户授权相关的函数
 */

// 持久化存储登录用户信息
const userInfoKey = 'user-info'
export function saveUserInfo (userInfo = {}) { // userInfo = {} 给个默认为空,如果用户传值就用用户传递的,如果没传,默认为空
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

// 获取登录用户信息
export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey)
}

// 获取用户信息的token令牌
export function getToken () {
  return JSON.parse(getUserInfo()).token
}

// 删除用户信息
export function removeUserInfo () {
  window.localStorage.removeItem(userInfoKey)
}
