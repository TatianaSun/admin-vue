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
      loading: true
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
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadCategories(1)
      this.currentPage = 1 // 让页面高亮效果回归到第一页
    },
    handleCurrentChange (page ) {
      this.loadCategories(page)
    }
  }
}
