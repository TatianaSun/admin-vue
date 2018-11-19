export default {
  created () {
    this.loadRoleList()
  },
  data () {
    return {
      roleList: []
    }
  },
  methods: {
    async loadRoleList () {
      // 发送请求,获取数据
      const res = await this.$http.get('/roles')
      const {data, meta} = res.data
      // console.log(data,meta)
      if (meta.status === 200) {
        this.roleList = data
      }
    }
  }
}
