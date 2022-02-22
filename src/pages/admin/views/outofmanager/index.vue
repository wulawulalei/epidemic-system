<template>
  <div id="outofmanager" class="body-common">
    <div class="remind">
      <h4>外出管理</h4>
      <p>该数据表为小区住户申请外出表，可自行添加外出申请</p>
      <p>添加一个新的外出请求，<span @click="showAdd=true" class="add">点击这里进行添加</span></p>
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
      <!-- 外出原因列 -->
      <el-table-column prop="result" label="外出原因" min-width="300">
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
          <img src="" alt="" @click="canGoOut(true, scope.row.id)" />
          <img src="" alt="" @click="canGoOut(false, scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <Add :show.sync="showAdd"/>
  </div>
</template>
<script>
import Add from '../../components/add'
import { Table, TableColumn, Pagination } from 'element-ui'
export default {
  name: 'outofmanager',
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
      list: [
        {
          name: 'hhh',
          phone: '4564564',
          address: 'hhhhhhhh',
          result: '有事哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
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
    },
    canGoOut (flag, id) {
      console.log(flag, id)
    }
  }
}
</script>
<style lang="scss" scoped>
#outofmanager {
  .remind{
    padding: 20px 0 0;
    h4{
      margin: 0;
      margin-bottom: 10px;
    }
    p{
      font-size: 14px;
      color: #98a6ad;
      .add{
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
