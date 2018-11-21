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
      },
      treeCheckedKeys: [],
      currentRole: null // 用来存储当前被授权的角色
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
    async showEditRights (role) {
      // 点击'授权'按钮,保存当前被授权的角色,用于给授权弹框提交表单的时候使用
      this.currentRole = role
      // console.log(role)
      // console.log(role.children)
      const res = await this.$http.get('/rights/tree')
      const {data, meta} = res.data
      if (meta.status === 200) {
        // 更新权限列表树菜单
        this.treeData = data
        // 找到角色拥有的所有权限的id,然后赋值给 treeCheckedKeys,让节点默认被选中
        this.treeCheckedKeys = this.getRightsId(role.children)
        // 显示权限对话框
        this.editRightsDia = true
      }
    },
    // 授权角色
    async handleEditRights () {
      // 获取菜单树中已选中的所有节点
      const checkedNodes = this.$refs.rightsTree.getCheckedNodes()
      // 拿到所有权限节点的id及pid, 将其放到数组中,去重,然后转为字符串,以逗号分隔
      let ids = ''
      checkedNodes.forEach(function (item) {
        ids += item.id + ',' + item.pid + ','

      })
      // console.log(ids)
      // 数组去重,再将数组重新转成一个以','分隔的字符串去请求服务器接口
      const setRightIds = new Set(ids.split(','))
      setRightIds.delete('')
      const rightIds = [...setRightIds].join(',')
      // console.log(rightIds)
      // console.log(this.currentRole)
      const res = await this.$http.post(`/roles/${this.currentRole.id}/rights`, {
        rids: rightIds
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.loadRoleList()
        this.editRightsDia = false
        this.$message({
          type: 'success',
          message: '授权成功!'
        })
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
    },
    // 删除角色指定权限
    async handleRemoveRights (role,right) {
      // console.log(role,right)
      const res = await this.$http.delete(`/roles/${role.id}/rights/${right.id}`)
      const {data, meta} = res.data

      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '删除权限成功!'
        })
        // 删除完成重新加载权限列表
        role.children = data
      }
    },
    // 使用递归获取三级权限id
    getRightsId (rightList) {
      const arr = [] // 定义一个空数组,用来接收三级权限的id
      const f = function (rightList) {
        rightList.forEach(function (item) {
          if (!item.children) {
            arr.push(item.id)
          } else {
            f(item.children)
          }
        })
      }
      f(rightList)
      return arr
    }
  }
}
