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
            icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain>
          添加用户
        </el-button>
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
          <!-- 通过scope.row可以拿到当前遍历的行对象 -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button size="mini" type="warning" icon="el-icon-success"></el-button>
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
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>

export default {
  async created () {
    // 用户列表组件一上来就加载第一页,每页1条数据
    this.loadUsersByPage(1, 1)
  },
  data () {
    return {
      searchText: '',
      tableData: [], // 表格列表数据
      totalSize: 0, // 总数据条数
      currentPage: 1, // 当前页码
      pageSize: 1 // 每页条数
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
      this.currentPage = currentPage
      // 拿到当前最新的每页的条数
      this.loadUsersByPage(currentPage, this.pageSize)
    },
    // 根据页码加载用户数据
    async loadUsersByPage (page, pageSize) {
      const res = await this.$http.get('/users', {
        params: { // 配置参数 pagenum 和pagesize 不能为空
          pagenum: page, // 这个页码就是当前页码:current-page
          pagesize: pageSize // 这个就是每页显示的条数page-size
        }
      })
      // console.log(res)
      const {users, total} = res.data.data
      // 动态渲染数据
      this.tableData = users
      this.totalSize = total
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
