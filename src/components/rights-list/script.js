export default {
  created () {
    this.loadRightsList()
  },
  data () {
    return {
      tableData: [

      ],
      loading: true
    }
  },
  methods: {
    async loadRightsList () {
      const res = await this.$http.get('./rights/list')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data
        // 数据加载完毕,让loading隐藏
        this.loading = false
      }
    }
  }
}
