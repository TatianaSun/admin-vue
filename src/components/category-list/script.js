export default {
  created () {
    this.loadCategories(1)
  },
  data () {
    return {
      tableDate: [],
      currentPage: 1,
      pageSize: 10,
      totalSize: 0,
      loading: true,
      addCateDia: false,
      addCateForm: {
        cat_name: '',
        cat_level: 0,
        cat_pid: []
      },
      cateOptions: []
    }
  },
  methods: {
    async loadCategories (page) {
      this.loading = true
      const res = await this.$http.get('/categories',{
        params: {
          type: 3,
          pagenum: page,
          pagesize: this.pageSize
        }
      })
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableDate = data.result
        this.totalSize = data.total
        this.loading = false // 取消loading效果
      }
    },
    // 级联选择器改变的事件处理函数
    handleCascadeChange (val) {
      console.log(val)
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadCategories(1)
      this.currentPage = 1 // 让页面高亮效果回归到第一页
    },
    handleCurrentChange (page ) {
      this.loadCategories(page)
    },
    // 显示添加分类对话框
    async handleShowCate () {
      // 加载二级分类列表数据到级联选择器中
      const res = await this.$http.get('/categories',{
        params: {
          type: 2
        }
      })
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        // 显示弹框
        this.addCateDia = true
        this.cateOptions = data
      }
    },
    // 添加分类
    async handleAddCates () {
      // console.log(this.addCateForm)
      // cat_level就是cat_pid的长度,数组长度为0 ,cat_level就是0,表示一级分类,cat_pid=0
      // 数组长度为1 ,cat_level就是1,表示二级分类,cat_pid=数组第0项的值
      // 数组长度为2 ,cat_level就是2,表示三级分类,cat_pid=数组第1项的值
      this.addCateForm.cat_level = this.addCateForm.cat_pid.length
      let cat_pid = 0
      switch (this.addCateForm.cat_pid.length) {
        case 1:
          cat_pid = this.addCateForm.cat_pid[0]
          break
        case 2:
          cat_pid = this.addCateForm.cat_pid[1]
          break
      }
      // console.log(this.addCateForm.cat_name,this.addCateForm.cat_level,cat_pid)
      const res = await this.$http.post('/categories',{
        cat_name: this.addCateForm.cat_name,
        cat_level: this.addCateForm.cat_level,
        cat_pid
      })
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加分类成功!'
        })
        // 关闭对话框
        this.addCateDia = false
        // 清空表单
        this.addCateForm.cat_name = '',
        this.addCateForm.cat_pid = []
        // 重载当前页
        this.loadCategories(this.currentPage)
      }
    }
  }
}
