<template>
  <el-container class="container">
    <el-header class="hl-header">
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"><img style="vertical-align:middle;" src="./logo.png" alt=""></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">好利CMS电商后台管理系统</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><a href="#">退出</a></div></el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <el-aside class="hl-aside" width="200px">Aside</el-aside>
      <el-main class="hl-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  }
}

</script>
<style>
.container {
  height: 100%;
}
.hl-header {
  background-color: #B3C0D1;
  line-height: 60px;
  text-align: center;
}
.hl-aside {
  background-color: #D3DCE6;
}
.hl-main {
  background-color: #E9EEF3;
  height: 100%;
}
</style>
