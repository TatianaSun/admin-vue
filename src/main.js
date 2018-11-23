// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

// 引入ElTreeGrid
import ElTreeGrid from 'element-tree-grid'

// 使用Vue插件
import httpPlugin from '@/assets/js/http.js'

// 引入公共样式
import '@/assets/css/style.css'
Vue.use(ElementUI)

// 将ElTreeGrid 注册为全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid)

// 加载httpPlugin插件(封装自axios)
Vue.use(httpPlugin)
Vue.config.productionTip = false

// 我们通过Vue.prototype.$成员名 => 为vue添加原型成员
// 因此通过这个方法我们可以把axios实例注入到vue实例中
// 所有组件都是Vue实例,因此所有组件的this都可以访问Vue.prototype原型成员
// Vue.prototype.$http = axios实例

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
