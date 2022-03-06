<template>
  <div id="users" class="body-common">
    <div class="remind">
      <h4>账号管理</h4>
      <p>该数据表为账号信息，包含各类用户账号信息</p>
      <p>
        若有未录入账号，
        <span @click="showAdd = true" class="add">点击这里进行添加</span>
      </p>
    </div>
    <div class="header">
      <div class="pagination">
        <el-pagination
          :total="pagination.total"
          :page-size="pagination.limit"
          :page-sizes="[2, 4, 6]"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.page"
          :pager-count="5"
          layout="prev, pager, next,jumper"
        ></el-pagination>
      </div>
      <div class="search">
        <label>
          Search:
          <input
            type="text"
            v-model="search"
            placeholder="输入您要搜索的人员"
            @keyup.enter="searchUser"
          />
        </label>
      </div>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      :header-row-style="{ backgroundColor: '#ccc' }"
      padding:8px
      :empty-text="loading ? 'loading...' : '暂无数据'"
    >
      <!-- 姓名列 -->
      <el-table-column prop="name" label="姓名">
        <template slot-scope="scope">{{ scope.row.name || "-" }}</template>
      </el-table-column>
      <!-- 住址列 -->
      <el-table-column prop="address" label="住址">
        <template slot-scope="scope">
          {{
          scope.row.address == 0
          ? "A区"
          : scope.row.address == 1
          ? "B区"
          : scope.row.address == 2
          ? "C区"
          : scope.row.address == 3
          ? "D区"
          : "-" || "-"
          }}
        </template>
      </el-table-column>
      <!-- 电话列 -->
      <el-table-column prop="phone" label="电话">
        <template slot-scope="scope">{{ scope.row.phone || "-" }}</template>
      </el-table-column>
      <!-- 权限列 -->
      <el-table-column prop="authority" label="权限">
        <template slot-scope="scope">
          {{
          scope.row.authority == 0 ? "普通用户" : "管理员" || "-"
          }}
        </template>
      </el-table-column>
      <!-- 管理的小区号列 -->
      <el-table-column prop="village" label="管理区">
        <template slot-scope="scope">
          {{
          scope.row.village == 0
          ? "A区"
          : scope.row.village == 1
          ? "B区"
          : scope.row.village == 2
          ? "C区"
          : scope.row.village == 3
          ? "D区"
          : "-" || "-"
          }}
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column prop="control" label="操作">
        <template slot-scope="scope">
          <i class="iconfont icon-xiugai" title="修改" @click="updateMessage(scope.row)"></i>
          <i class="iconfont icon-shanchu" title="删除" @click="deleteUser(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <Add :show.sync="showAdd" :user="user" @init="init" />
    <Delete :show.sync="showDelete" :user="user" @init="init" />
  </div>
</template>
<script>
import Add from '../../components/add'
import Delete from '../../components/delete'
import { Table, TableColumn, Pagination } from 'element-ui'
import { getuser } from '@/api/admin'
export default {
  name: 'users',
  components: {
    Add,
    Delete,
    [Pagination.name]: Pagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      // 加载中时显示loading
      loading: true,
      // 是否展示添加弹框
      showAdd: false,
      // 是否展示删除弹框
      showDelete: false,
      // 修改用户信息时传给组件的信息
      user: {},
      // 搜索框的内容
      search: '',
      searchTest: '',
      // 展示的列表
      list: [],
      // 分页器
      pagination: {
        total: 0,
        page: 1,
        limit: 10
      }
    }
  },
  watch: {
    showAdd(val) {
      if (!val) {
        this.user = {}
      }
    },
    showDelete(val) {
      if (!val) {
        this.user = {}
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let send = {
        page: this.pagination.page,
        limit: this.pagination.limit
      }
      this.searchTest && (send.search = this.searchTest)
      this.loading = true
      getuser(send).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.loading = false
      }, () => {
        this.loading = false
      })
    },
    //搜索用户
    searchUser() {
      this.pagination.page = 1
      this.total = 0
      this.searchTest = this.search
      this.init()
    },
    handleCurrentChange() {
      this.list = []
      this.init()
    },
    updateMessage(obj) {
      this.user = obj
      this.showAdd = true
    },
    deleteUser(obj) {
      this.user = obj
      this.showDelete = true
    }
  }
}
</script>
<style lang="scss" scoped>
#users {
  .remind {
    padding: 20px 0 0;
    h4 {
      margin: 0;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      color: #98a6ad;
      .add {
        color: $primary;
        cursor: pointer;
      }
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    input {
      width: 180px;
      height: 30px;
      margin-left: 7px;
      padding: 5px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
    }
  }
  i {
    margin-right: 10px;
    font-size: 20px;
    vertical-align: middle;
    &:nth-of-type(2) {
      font-size: 23px;
    }
  }
}
</style>
