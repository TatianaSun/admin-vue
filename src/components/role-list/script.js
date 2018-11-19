export default {
  created () {
    this.loadRoleList()
  },
  data () {
    return {
      roleList: [],
      addRolesDia: false,
      roleForm:{
        roleName: '',
        roleName: ''
      }
    }
  },
  methods: {
    // 加载角色列表
    async loadRoleList () {
      // 发送请求,获取数据
      const res = await this.$http.get('/roles')
      const {data, meta} = res.data
      // console.log(data,meta)
      if (meta.status === 200) {
        this.roleList = data
      }
    },
    // 添加角色
    async handleAddRoles () {
      // console.log(this.roleForm)
      const res = await this.$http.post('/roles',this.roleForm)
      // console.log(res)
      // 表单验证,去除重名之类的先不做
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加角色成功!'
        })
        this.addRolesDia = false
        // 清空添加角色的表单数据
        for (let key in this.roleForm) {
          this.roleForm[key] = ''
        }
        // 重新加载角色列表
        this.loadRoleList()
      }
    },
    // 删除角色
    async handleRemoveRoles (role) {
      // console.log(role)
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        // 拿到角色id
        const {id: roleId} = role
        const res = await this.$http.delete(`/roles/${roleId}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除角色成功!'
          })
          // 重新加载角色列表
          this.loadRoleList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
       })
     })
    }
  }
}
