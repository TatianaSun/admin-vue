export default {
  created () {
    this.loadRoleList()
  },
  data () {
    return {
      roleList: [],
      addRolesDia: false,
      editRolesDia: false,
      editRightsDia: false,
      roleForm:{
        roleName: '',
        roleDesc: ''
      },
      editRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      editRightForm: {

      },
      treeData: [],
      treeProps: {
        children: 'children',
        label: 'authName'
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
    /**
     * 编辑角色
     * 一.显示编辑弹框,在弹框中加载要编辑的表单内容
     * 1. 注册点击事件,拿到id,根据id呈现表单内容
     * 二.编辑后提交表单,完成更新操作
     */
    async handleEditRoles (role) {
      // console.log(role)
      const {id: roleId} = role
      const res = await this.$http.get(`/roles/${roleId}`)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.editRoleForm = data // 让相应的数据呈现在表单中
        // 弹出编辑对话框
        this.editRolesDia = true
      }
    },
    // 更新编辑
    async handleUpdateRoles () {
      // 拿到数据
      const res = await this.$http.put(`/roles/${this.editRoleForm.roleId}`,this.editRoleForm)
      if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '角色信息更新成功!'
          })
          // 关闭弹框
          this.editRolesDia = false
          // 重新加载角色列表
          this.loadRoleList()
        }
    },
    // 显示授权对话框
    async showEditRights () {
      const res = await this.$http.get('/rights/tree')
      const {data, meta} = res.data
      if (meta.status === 200) {
        // 更新权限列表树菜单
        this.treeData = data
        // 显示权限对话框
        this.editRightsDia = true
      }
    },
    // 授权角色
    async editRights () {
      console.log(123)
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
