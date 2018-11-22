<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" ref="form" :model="userForm" label-width="80px">
      <h2>管理员登录</h2>
      <el-form-item label="用户名">
        <el-input
          v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="login">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { saveUserInfo } from '@/assets/js/auth.js'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // 采集表单数据
      // 表单验证(暂时先不做)
      // 发送请求,执行登录操作
      // 根据响应做交互
      // console.log(this.userForm)
      const res = await this.$http.post('/login', this.userForm)
      const { data } = res
      if (data.meta.status === 200) {
        // console.log(1)
        // 登录成功,将服务器签发的token保存到localStorage中
        // 其他组件需要使用token的,需要到本地存储获取,这里我们加载自己封装的auth.js里面的函数
        saveUserInfo(data.data)
        const {redirect} = this.$route.query
        if (redirect) { // 如果查询字符串中有redirect,就让其跳转到这个字段里
          this.$router.push(redirect.substr(1)) // substr(1)去掉hash后面那个"#"号
        } else {
          // 否则让其跳转到home组件
          this.$router.push({
            name: 'home'
          })
        }
        // 提示信息
        this.$message({
          type: 'success',
          message: '登录成功!'
        })
      }
    }
  }
}

</script>
<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 500px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
