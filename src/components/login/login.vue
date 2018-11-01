<template>
  <div class="login-wrap">
    <el-form label-position="top" ref="form" :model="userForm" label-width="80px">
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
      <el-button type="primary" @click="login">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
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
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.userForm)
      const { data } = res
      if (data.meta.status === 200) {
        // console.log(1)
        // 让其跳转到home组件
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}

</script>
<style>
.login-wrap {
  width: 500px;
  height: 300px;
  background-color: #ccc;
  padding: 20px 20px 5px 20px;
  margin: 200px auto;
  border-radius: 10px;
}
</style>
