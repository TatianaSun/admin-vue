// 加载公共组件
import CategoryCascader from '@/common/category-cascader'
export default {
  created () {},
  data () {
    return {
      options: [],
      inputVisible: false,
      tableData: [],
      currentCateId: 0,
      addManyDia: false,
      addManyForm: {
        attr_sel: 'many',
        attr_name: ''
      }
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
        this.loadManyParams()
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
      this.loadManyParams()
    },
    // 显示添加动态参数对话框
    showManyDia () {
      if (this.currentCateId === 0) {
        this.$message({
          type: 'warning',
          message: '请先选择分类后再添加参数!'
        })
        return
      }
      this.addManyDia = true
    },
    // 添加动态参数分类
    async handleAddManyParam () {
      // console.log(this.addManyForm)
      const resu = await this.$http.post(`/categories/${this.currentCateId}/attributes`,this.addManyForm)
      const {data, meta} = resu.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: "添加动态参数分类成功"
        })
        this.addManyDia = false // 关闭对话框
        this.addManyForm.attr_name = '' // 清空表单元素
        this.loadManyParams()
      }
    },
    // 封装加载动态参数
    async loadManyParams () {
      const res = await this.$http.get(`/categories/${this.currentCateId}/attributes`,{
        params: {
          sel: 'many'
        }
      })
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        // 将attr_vals字符串处理成数组
        data.forEach(item => {
          item.attr_vals = item.attr_vals.split(',')
        })
        this.tableData = data
        // 动态的为tableData的每一行动态添加inputVisible属性
        this.tableData.forEach(item => {
          this.$set(item, 'inputVisible', false)
        })
      }
    },
    // 删除动态分类参数
    async removeManyPrama (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        const res = await this.$http.delete(`categories/${row.cat_id}/attributes/${row.attr_id}`)
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除参数成功!'
          })
          this.loadManyParams()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除标签分类
    async handleRemoveTag (row, index) {
      // console.log(row, index)
      row.attr_vals.splice(index,1) // 删除该标签
      const resul = await this.$http.put(`/categories/${this.currentCateId}/attributes/${row.attr_id}`, {
          ...row, // 展开,对象拷贝,也称混入
          attr_vals: row.attr_vals.join(',') // 这里的attr_vals就覆盖当前行的attr_vals了
      })
      const {data, meta} = resul.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '分类参数更新成功'
        })
      }
    }
  },
  components: {
    // 将公共组件注册为子组件,然后,在模板html中注册标签才能使用
    CategoryCascader
  }
}
