<template>
  <el-container class="container">
    <el-header class="hl-header">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img style="vertical-align:middle;" src="./logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content hl-title bg-purple">
            好利CMS电商后台管理系统
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <a
              href="#"
              @click.prevent="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <el-aside class="hl-aside" width="200px">
        <el-menu
          default-active="2"
          class="aside-menu el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
          :router="true">
          <el-submenu
            v-for="level1Menu in menuList"
            :index="level1Menu.path"
            :key="level1Menu.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <!-- 一级菜单的菜单名称 -->
              <span>{{ level1Menu.authName }}</span>
            </template>
            <el-menu-item
              v-for="level2Menu in level1Menu.children"
              :index="level2Menu.path"
              :key="level2Menu.id">{{ level2Menu.authName }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="hl-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { removeUserInfo } from '@/assets/js/auth.js'
export default {
  created () {
    // 动态的加载用户角色对应的权限菜单数据
    this.loadMenu()
  },
  data () {
    return {
      menuList: []
    }
  },
  methods: {
    logout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除本地存储中的用户信息
        removeUserInfo()
        // 跳转到登录组件(重定向)
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消退出'
        // })
        // 点击取消的处理
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 动态加载左侧菜单
    async loadMenu () {
      const res = await this.$http.get(`/menus`)
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.menuList = data
      }
    }
  }
}

</script>

<style>
.container, .el-aside .aside-menu {
  height: 100%;
}

.hl-header {
  height: 100%;
  background-color: #B3C0D1;
  line-height: 60px;
  text-align: center;
}
.hl-header .hl-title {
  font-size: 24px;
}
.hl-aside {
  background-color: #D3DCE6;
}

.hl-main {
  background-color: #E9EEF3;
  height: 100%;
}
</style>
