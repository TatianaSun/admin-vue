import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'

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
      component: Home
    }
  ]
})

// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果是登录组件,则直接放行通过
  // 如果不是登录组件,则检查token令牌,有令牌就放行,没有令牌就让其跳转到登录页
  // console.log(to)
  if (to.name === 'login') {
    next()
  } else {
    // 检查token令牌,有则放心,无则跳转登录组件
    const token = window.localStorage.getItem('admin-token')
    if (!token) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})

export default router
