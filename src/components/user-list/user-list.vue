<template>
  <div user-list-wrap>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb class="user-list-breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="search-role">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          type="success"
          plain
          @click="dialogFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="100">
        <template slot-scope="scope">
          <!-- 通过scope.row可以拿到当前遍历的行对象
          @change="(val) => {handleStateChange(val, scope.row)}"
          change是element组件的switch自带的属性,控制开关的选中状态的一个方法
          必须用箭头函数才能既获取开关状态,又获取行id
          -->
          <el-switch
            v-model="scope.row.mg_state"
            @change="(val) => {handleStateChange(val, scope.row)}"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button plain size="mini" type="warning" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      current-page: 就是当前页码
      page-size: 每页多少条数据
      page-sizes: 可以自定义每页多少条数据
      total : 总条数
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible">
      <!-- 为el-form添加表单验证:
        必须要有:rules: 一个对象
        表单中el-form-item 要有prop 方法

        如果想要使用javascript来强行验证,需要添加ref属性,给ref起个名字(类似给元素起id名)
        在javaScript中使用this.$refs['ref名字'].validate()验证表单
        validate()里面接收一个函数,一般用箭头函数,参数就是valid ,返回布尔值,通过这个布尔值来判断是否验证通过
      -->
      <el-form
        :model="userForm"
        :rules="addUserRules"
        ref="addUserForm"
        >
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px" prop="mobile">
          <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

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
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      dialogFormVisible: false,
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
          // 关闭对话框
          this.dialogFormVisible = false
          // 加载当前页
          this.loadUsersByPage(this.currentPage)
        }
      })
    },
    // switch开关状态改变,修改用户的登录状态
    async handleStateChange (state, user) {
      // console.log(state, user)
      // 拿到用户id ,发起请求,根据val改变用户状态
      const {id: userId} = user // 解构赋值,并给id改名为userId
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

</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
}
.search-role {
  margin-bottom: 10px;
}

</style>
