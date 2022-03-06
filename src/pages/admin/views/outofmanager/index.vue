<template>
  <div id="outofmanager" class="body-common">
    <div class="remind">
      <h4>外出管理</h4>
      <p>该数据表为小区住户申请外出表，可自行添加外出申请</p>
      <p>
        添加一个新的外出请求，
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
            placeholder="输入您要搜索的人员的外出记录"
            v-model="search"
            @keyup.enter="searchList"
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
      <el-table-column prop="sex" label="电话">
        <template slot-scope="scope">{{ scope.row.phone || "-" }}</template>
      </el-table-column>
      <!-- 外出原因列 -->
      <el-table-column prop="result" label="外出原因">
        <template slot-scope="scope">
          <span :title="scope.row.result">{{ scope.row.result || "-" }}</span>
        </template>
      </el-table-column>
      <!-- 返区时间列 -->
      <el-table-column prop="result" label="返区时间">
        <template slot-scope="scope">
          <span :title="scope.row.time">{{ scope.row.time || "-" }}</span>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column prop="control" label="操作">
        <template slot-scope="scope">
          <i class="iconfont icon-yunxu" title="允许" @click="canGoOut(true, scope.row._id)"></i>
          <i
            class="iconfont icon-jujuechupiao"
            title="拒绝"
            @click="canGoOut(false, scope.row.id, scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <Add :show.sync="showAdd" @init="init" />
    <Refuse :show.sync="showRefuse" :user="user" @init="init" />
  </div>
</template>
<script>
import Add from '../../components/add'
import Refuse from '../../components/refuse'
import { getapply, handleapply } from '@/api/admin'
import { Table, TableColumn, Pagination } from 'element-ui'
export default {
  name: 'outofmanager',
  components: {
    Add,
    Refuse,
    [Pagination.name]: Pagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      user: {},
      // 加载中时显示loading
      loading: true,
      // 是否展示添加弹框
      showAdd: false,
      // 是否展示拒绝外出弹框
      showRefuse: false,
      // 搜索的内容
      search: '',
      searchText: '',
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
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let send = {
        page: this.pagination.page,
        limit: this.pagination.limit
      }
      this.searchText && (send.search = this.searchText)
      this.loading = true
      getapply(send).then(res => {
        this.list = res.data.list
        this.pagination.total = res.data.total
        this.loading = false
      }, () => {
        this.loading = false
      })
    },
    handleCurrentChange() {
      this.list = []
      this.init()
    },
    canGoOut(flag, id, user) {
      if (flag === false) {
        this.user = user
        this.showRefuse = true
      } else {
        handleapply(
          {
            _id: id,
            status: 1
          }
        ).then(res => {
          this.$toast(res.message)
          this.init()
        })
      }
    },
    searchList() {
      this.searchText = this.search
      this.list = []
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
#outofmanager {
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
    font-size: 25px;
    vertical-align: top;
    cursor: pointer;
    &:nth-of-type(1) {
      font-size: 27px;
    }
  }
}
</style>
