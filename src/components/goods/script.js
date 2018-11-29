export default {
  created () {
    this.loadGoods(1)
  },
  data () {
    return {
      tableData: [
        {
          goods_name: '',
          goods_price: '',
          goods_state: '',
          goods_weight: '',
          add_time: '',
        }
      ],
      pagenum: 1,
      pagesize: 10,
      currentPage: 1,
      totalSize: 0
    }
  },
  methods: {
    async loadGoods (page) {
      const res = await this.$http.get(`/goods`, {
        params: {
          pagenum: page,
          pagesize: this.pagesize
        }
      })
      const {data, meta} = res.data
      // console.log(data)
      if (meta.status === 200) {
        this.totalSize = data.total
        this.tableData = data.goods
      }
    },
    handleSizeChange (val) {
      this.pageSiza = val
      this.loadGoods(1)
      this.currentPage = 1 // 页码高亮回归第一页
    },
    handleCurrentChange (val) {
      this.loadGoods(val)
    }
  }
}
