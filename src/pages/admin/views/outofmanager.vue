<template>
  <div id="outofmanager" class="body-common">
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
        <template slot-scope="scope">{{ scope.row.name || '-' }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Table, TableColumn, Pagination } from 'element-ui'
export default {
  name: 'outofmanager',
  components: {
    [Pagination.name]: Pagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      loading: true,
      list: [],
      pagiantion: {
        total: 0,
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    handleCurrentChange() {
      console.log(1);
    }
  }
}
</script>
<style lang='scss' scoped>
#outofmanager {
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