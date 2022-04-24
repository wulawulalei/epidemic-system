<template>
  <div id="register">
    <div class="remind">
      <h4>登记检测</h4>
      <p>
        该数据表为住户本人的核酸检测情况表，可自行添加当前最新的核酸检测结果
      </p>
      <p>
        添加一个新的核酸检测结果，
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
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      :header-row-style="{ backgroundColor: '#ccc' }"
      padding:8px
      :empty-text="loading ? 'loading...' : '您还未提交过外出申请'"
    >
      <!-- 姓名列 -->
      <el-table-column prop="name" label="姓名">
        <template slot-scope="scope">{{ scope.row.name || '-' }}</template>
      </el-table-column>
      <!-- 住址列 -->
      <el-table-column prop="address" label="住址">
        <template slot-scope="scope">{{
          scope.row.address == 0
            ? 'A区'
            : scope.row.address == 1
            ? 'B区'
            : scope.row.address == 2
            ? 'C区'
            : scope.row.address == 3
            ? 'D区'
            : '-' || '-'
        }}</template>
      </el-table-column>
      <!-- 电话列 -->
      <el-table-column prop="sex" label="电话">
        <template slot-scope="scope">{{ scope.row.phone || '-' }}</template>
      </el-table-column>
      <!-- 检测结果列 -->
      <el-table-column prop="result" label="检测结果">
        <template slot-scope="scope">
          <span :title="scope.row.result == 0 ? '阴性' : '阳性'">{{
            scope.row.result == 0 ? '阴性' : '阳性' || '-'
          }}</span>
        </template>
      </el-table-column>
      <!-- 检测时间列 -->
      <el-table-column prop="result" label="检测时间">
        <template slot-scope="scope">
          <span :title="scope.row.time">{{ scope.row.time || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <Add :show.sync="showAdd" @init="init" />
  </div>
</template>
<script>
import Add from '../../components/add'
import { Table, TableColumn, Pagination } from 'element-ui'
import { getcheck } from '@/api/user'
export default {
  name: 'register',
  components: {
    Add,
    [Pagination.name]: Pagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      loading: true,
      showAdd: false,
      list: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const send = {
        page: this.pagination.page,
        limit: this.pagination.limit
      }
      this.loading = true
      getcheck(send).then(
        (res) => {
          this.list = res.data.list
          this.pagination.total = res.data.total
          this.loading = false
        },
        () => {
          this.loading = false
        }
      )
    },
    handleCurrentChange () {
      this.list = []
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
#register {
  margin-top: 76px;
  padding: 0 30px;
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
}
</style>
