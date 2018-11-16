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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/roles">角色列表</el-menu-item>
              <el-menu-item index="/rights">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">商品列表</el-menu-item>
              <el-menu-item index="3-2">商品分类</el-menu-item>
              <el-menu-item index="3-3">商品参数</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">数据报表</el-menu-item>
            </el-menu-item-group>
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
  data () {
    return {}
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
