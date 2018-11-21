export default {
  async created () {
    // 用户列表组件一上来就加载第一页
    this.loadUsersByPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [], // 表格列表数据
      totalSize: 0, // 总数据条数
      currentPage: 1, // 当前页码
      pageSize: 3, // 每页条数
      userForm: { // 添加用户的表单
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: { // 编辑用户的表单
        username: '',
        email: '',
        mobile: ''
      },
      handleRoleForm: { // 分配角色表单
        username: '',
        rid: -1 // 默认-1 标识没有权限
      },
      rolesList: [], // 分配角色对话框的角色列表
      dialogFormVisible: false, // 用来控制添加用户的对话框的弹出与关闭
      dialogEditFormVisible: false, // 用来控制编辑用户的对话框的弹出与关闭
      rightFormVisible: false, // 用来控制分配角色的对话框的弹出与关闭
      // 添加表单验证规则
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
        ]
      },
      // 编辑用户表单认证规则
      editUserRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 当点击切换每页条数的时候,会触发执行这个方法
    handleSizeChange (pageSize) {
      // console.log(`每页 ${pageSize} 条`)
      // 当每页条数变了时,我们都要从第一页开始重新加载数据
      // 获取最新的用户选择的每页条数
      this.pageSize = pageSize
      this.loadUsersByPage(1, pageSize)
      // 让分页组件的当前页面高亮回归为1
      this.currentPage = 1
    },
    // 当点击的页码发生变化的时候,会触发调用这个方法
    handleCurrentChange (currentPage) {
      // console.log(`当前页: ${currentPage}`)
      // 将currentPage 更新为最新点击的当前页码
      // this.currentPage = currentPage
      // 拿到当前最新的每页的条数
      this.loadUsersByPage(currentPage)
    },
    // 根据页码加载用户数据
    async loadUsersByPage (page) { // 如果用户没有指定条数,默认1条每页
      const res = await this.$http.get('/users', {
        params: { // 配置参数 pagenum 和pagesize 不能为空
          pagenum: page, // 这个页码就是当前页码:current-page
          pagesize: this.pageSize, // 这个就是每页显示的条数page-size
          query: this.searchText // 根据搜索框的内容来搜索
        }
      })
      // console.log(res)
      const {users, total} = res.data.data
      // 动态渲染数据
      this.tableData = users
      this.totalSize = total
    },
    // 处理搜索功能
    handleSearch () {
      this.loadUsersByPage(1) // 从第一页开始展示
    },
    // 点击确定添加用户
    async handleAddUser () {
      // 获取用户信息
      // console.log(this.userForm)
      // 表单验证
      // 发起请求,添加用户
      // 如果成功,关闭对话框,重新加载最新列表数据

      // VUE的$refs 方法可以用来获取设置了ref属性的DOM
      // console.log(this.$refs['addUserForm'])

      // 调用validate()方法 强行验证表单,参数 valid 就是布尔值
      this.$refs['addUserForm'].validate(async (valid) => {
        // console.log(vaild)
        if (!valid) { // 如果验证失败,返回 不提交
          return false
        }
        // 如果通过了表单验证
        const res = await this.$http.post('/users', this.userForm)
        // console.log(res)
        if (res.data.meta.status === 201) {
          // 根据响应做交互
          this.$message({
            type: 'success',
            message: '添加用户成功!'
          })
          // 清空表单内容
          for (let key in this.userForm) {
            this.userForm[key] = ''
          }
          // 关闭对话框
          this.dialogFormVisible = false
          // 加载当前页
          this.loadUsersByPage(this.currentPage)
        }
      })
    },
    // 编辑用户
    async handleEditUser () {
      // console.log(this.editUserForm)
      // 强行表单校验
      this.$refs['editUserForm'].validate(async (valid) => {
      // console.log(vaild)
        if (!valid) { // 如果验证失败,返回 不提交
          return false
        }
        // 如果通过了表单验证
        const {id: userId} = this.editUserForm
        const res = await this.$http.put(`/users/${userId}`,this.editUserForm)
         if (res.data.meta.status === 200) {
          // 根据响应做交互
          this.$message({
            type: 'success',
            message: '用户信息更新成功!'
          })
          // 关闭对话框
          this.dialogEditFormVisible = false
          // 重新加载当前页
          this.loadUsersByPage(this.currentPage)
        }
      })
    },
    // 展示要编辑的用户信息
    async handleShowUserInfo (user) {
      this.dialogEditFormVisible = true
        const res = await this.$http.get(`/users/${user.id}`)
        // console.log(res)
        this.editUserForm = res.data.data
    },
    // 显示用户授权弹框
    async handleShowRights (user) {
      // console.log(user)
      // 发送请求,拿到当前用户角色
      const res = await this.$http.get(`/users/${user.id}`)
      // console.log(res)
      // 发请求,拿到角色列表
      const resp = await this.$http.get(`/roles`)
      // console.log(resp)
      const {data, meta} = res.data
      if (meta.status === 200 && resp.data.meta.status === 200) {
        this.rightFormVisible = true // 弹出分配角色对话框
        this.handleRoleForm = data // 更新分配角色表单
        this.rolesList = resp.data.data // 更新角色列表
      }
    },
    // 分配角色权限
    handleRoleRight () {
      console.log("ok")
    },
    // 删除用户
    async handleDeleteUser (user) {
      // console.log(user)
      // 弹窗提示用户是否确认删除
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 拿到用户id
        const {id: userId} = user
        const res = await this.$http.delete(`/users/${userId}`)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 删除成功重新加载当前页
          this.loadUsersByPage(this.currentPage)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // switch开关状态改变,修改用户的登录状态
    // async handleStateChange (state, user) {
    //   // console.log(state, user)
    //   // 拿到用户id ,发起请求,根据val改变用户状态
    //   const {id: userId} = user // 解构赋值,并给id改名为userId
    //   const res = await this.$http.put(`/users/${userId}/state/${state}`)
    //   // console.log(res)
    //   if (res.data.meta.status === 200) {
    //     // 提示用户修改状态成功
    //     this.$message({
    //       type: 'success',
    //       message: `修改成功!用户状态更改为${state ? '启用' : '禁用'}`
    //     })
    //   }
    // },
    // switch开关状态改变,修改用户的登录状态,改良
    async handleStateChange (user) {
      // console.log(user)
      const {id: userId, mg_state: state} = user // 解构赋值
      const res = await this.$http.put(`/users/${userId}/state/${state}`)
      // console.log(res)
      if (res.data.meta.status === 200) {
        // 提示用户修改状态成功
        this.$message({
          type: 'success',
          message: `修改成功!用户状态更改为${state ? '启用' : '禁用'}`
        })
      }
    }
  }
}
