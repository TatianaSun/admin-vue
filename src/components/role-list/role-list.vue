<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        高级筛选<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="choose">
        <div style="border-left: 5px solid red; padding-left: 8px;">
          情绪选择
        </div>
        <div>
          <span><a href="#">全部情绪</a></span>
          <span><a href="#">正面</a></span>
          <span><a href="#">中性</a></span>
          <span><a href="#">负面</a></span>
        </div>
        <div style="border-left: 5px solid red; padding-left: 8px;">
          排序
        </div>
        <div>
          <span><a href="#">默认</a></span>
          <span><a href="#">相关性</a></span>
          <span><a href="#">热度最高</a></span>
          <span><a href="#">时间升序</a></span>
          <span><a href="#">时间降序</a></span>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style>
.choose {
  width: 500px;
  height: 400px;
  background-color: lightgreen;
}
a {
  text-decoration: none;
}
</style>
