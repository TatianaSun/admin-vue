// 加载公共组件
import CategoryCascader from '@/common/category-cascader'
export default {
  created () {},
  data () {
    return {
      options: [],
      inputVisible: false,
      inputValue: '',
      tableData: []
    }
  },
  methods: {
    handleInputConfirm () {
      this.inputVisible = false
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        // 让input聚焦
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleChange (val) {
      // console.log("监听到子组件内部的handleChange事件了",val)
      const categoryId = val[2]
      const res = await this.$http.get(`/categories/${categoryId}/attributes`,{
        params: {
          sel: 'many'
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
    }
  },
  components: {
    // 将公共组件注册为子组件,然后,在模板html中注册标签才能使用
    CategoryCascader
  }
}
