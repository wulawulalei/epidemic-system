<template>
    <div id="users" class="body-common">
    <div class="remind">
      <h4>账号管理</h4>
      <p>该数据表为账号信息，包含各类用户账号信息</p>
      <p>
        若有未录入账号，<span @click="showAdd = true" class="add"
          >点击这里进行添加</span
        >
      </p>
    </div>
    <div class="header">
      <div class="pagination">
        <el-pagination
          :total="pagiantion.total"
          :page-size="pagiantion.limit"
          :page-sizes="[2, 4, 6]"
          @current-change="handleCurrentChange"
          :current-page.sync="pagiantion.page"
          :pager-count="5"
          layout="prev, pager, next,jumper"
        ></el-pagination>
      </div>
      <div class="search">
        <label>
          Search:
          <input type="text" />
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
        <template slot-scope="scope">{{ scope.row.address || "-" }}</template>
      </el-table-column>
      <!-- 电话列 -->
      <el-table-column prop="sex" label="电话">
        <template slot-scope="scope">{{ scope.row.phone || "-" }}</template>
      </el-table-column>
      <!-- 权限列 -->
      <el-table-column prop="sex" label="权限">
        <template slot-scope="scope">{{ scope.row.power || "-" }}</template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column prop="control" label="操作">
        <template slot-scope="scope">
          <img src="" :alt="scope.row.id" />
          <img src="" alt=""/>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
import { Table, TableColumn, Pagination } from 'element-ui'
export default {
  name: 'users',
  components: {
    [Pagination.name]: Pagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      loading: true,
      showAdd: false,
      list: [
        {
          name: 'hhh',
          phone: '4564564',
          address: 'hhhhhhhh',
          power: '管理员',
          id: 1
        }
      ],
      pagiantion: {
        total: 0,
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    handleCurrentChange () {
      console.log(1)
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
}
</style>
