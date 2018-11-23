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
      },
      cateOptions: [],
      selectedOptions: []
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
    }
  }
}
