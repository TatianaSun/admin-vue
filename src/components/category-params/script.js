// 加载公共组件
import CategoryCascader from '@/common/category-cascader'
export default {
  created () {},
  data () {
    return {
      options: [],
      inputVisible: false,
      tableData: [],
      currentCateId: 0
    }
  },
  methods: {
    async handleInputConfirm (param,e) {
      // console.log(param)
      // 拿到当前输入框的值和要修改的参数对象attr_vals
      // 把输入框的值拼接到参数对象中,以逗号分隔
      // 再发请求处理

      // 如果用户输入内容为空,则不做任何处理
      if (e.target.value.length === 0) {
        // 让input隐藏
        param.inputVisible = false
        return
      }
      // 处理定制的标签字符串attr_vals
      param.attr_vals += `,${e.target.value}`

      const resp = await this.$http.put(`/categories/${this.currentCateId}/attributes/${param.attr_id}`,param)
      // console.log(resp)
      const {data, meta} = resp.data
      if (meta.status === 200) {
        // 让input标签文本框隐藏
        param.inputVisible = false
        this.$message({
          type: 'success',
          message: '分类参数更新成功'
        })
        // 清空input标签文本框
        e.target.value = ''
      }
    },
    // row 就是当前行
    showInput (row) {
      // 让当前行的inputVisible显示
      row.inputVisible = true
      this.$nextTick( () => {
        // 让input聚焦
        // console.log(this.$refs.saveTagInput)
        this.$refs.saveTagInput.$refs.input.focus()
        // this.$refs.saveTagInput 是一个组件el-input这个组件
      })
    },
    async handleChange (val) {
      // console.log("监听到子组件内部的handleChange事件了",val)
      const categoryId = this.currentCateId = val[2]
      const res = await this.$http.get(`/categories/${categoryId}/attributes`,{
        params: {
          sel: 'many'
        }
      })
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableData = data
        // 动态的为tableData的每一行动态添加inputVisible属性
        this.tableData.forEach(item => {
          this.$set(item, 'inputVisible', false)
        })
      }
    }
  },
  components: {
    // 将公共组件注册为子组件,然后,在模板html中注册标签才能使用
    CategoryCascader
  }
}
