<template>
  <el-container class="container">
    <el-header class="hl-header">Header</el-header>
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
}
.hl-aside {
  background-color: #D3DCE6;
}
.hl-main {
  background-color: #E9EEF3;
  height: 100%;
}
</style>
