<template>
  <div id="details" class="body-common">
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
import { Table, TableColumn } from 'element-ui'
export default {
  name: 'details',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      loading: true,
      list: [],
    }
  }
}
</script>
<style lang='scss' scoped>
</style>