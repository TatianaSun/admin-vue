<template>
  <div>
    <el-cascader
      clearable
      @change="handleChange"
      :options="options"
      :props="{value:'cat_id',label:'cat_name'}">
    </el-cascader>
  </div>
</template>

<script>
import Category from '@/api/category'
export default {
  created () {
    this.loadOptions()
  },
  // 父传子
  props: {
    level: {
      // prop验证
      type: [String, Number],
      default: 3
    }
  },
  data () {
    return {
      options: []
    }
  },
  methods: {
    async loadOptions () {
      const res = await Category.findAll(this.level)
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.options = data
      }
    },
    handleChange (val) {
      // 子传父
      this.$emit('change', val)
    }
  }
}
</script>

<style>
</style>
