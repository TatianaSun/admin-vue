import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'

import UserList from '@/components/user-list/user-list'
import RoleList from '@/components/role-list/role-list'

// 加载自己封装的函数
import { getUserInfo } from '@/assets/js/auth.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'role-list',
          path: '/roles',
          component: RoleList
        }
      ]
    }
  ]
})

// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果是登录组件,则直接放行通过
  // 如果不是登录组件,则检查用户登录信息,如果已经登录就放行,没有就让其跳转到登录页
  // console.log(to)
  if (to.name === 'login') {
    next()
  } else {
    // 检查登录信息,有则放行,无则跳转登录组件
    if (!getUserInfo()) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})

export default router
