<template>
  <div id="detail" class="body-common">
    <div class="remind">
      <h4>住户核酸检测情况</h4>
      <p>该数据表为小区住户核酸检测结果表，可自行添加核酸检测结果</p>
      <p>
        添加一个新的核酸检测结果，<span @click="showAdd = true" class="add"
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
          <input type="text" placeholder="输入您要搜索的人员的核酸检测记录" v-model="search" @keyup.enter="init"/>
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
        <template slot-scope="scope">{{
          scope.row.address == 0
            ? "A区"
            : scope.row.address == 1
            ? "B区"
            : scope.row.address == 2
            ? "C区"
            : scope.row.address == 3
            ? "D区"
            : "-" || "-"
        }}</template>
      </el-table-column>
      <!-- 电话列 -->
      <el-table-column prop="sex" label="电话">
        <template slot-scope="scope">{{ scope.row.phone || "-" }}</template>
      </el-table-column>
      <!-- 时间列 -->
      <el-table-column prop="sex" label="检测时间">
        <template slot-scope="scope">{{ scope.row.time || "-" }}</template>
      </el-table-column>
      <!-- 检测结果列 -->
      <el-table-column prop="num" label="检测结果">
        <template slot-scope="scope">
          <span :title="scope.row.result">{{
            scope.row.num == 0 ? "阴性" : "阳性" || "-"
          }}</span>
        </template>
      </el-table-column>
    </el-table>
    <Add :show.sync="showAdd" />
  </div>
</template>
<script>
import Add from '../../components/add'
import { Table, TableColumn, Pagination } from 'element-ui'
export default {
  name: 'detail',
  components: {
    Add,
    [Pagination.name]: Pagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      // 加载中时显示loading
      loading: true,
      // 是否展示添加弹框
      showAdd: false,
      // 搜索的内容
      search: '',
      // 展示的列表
      list: [
        {
          name: 'hhh',
          phone: '4564564',
          address: '0',
          time: '2022-2-21',
          num: 1,
          id: 1
        }
      ],
      // 分页器
      pagiantion: {
        total: 0,
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    init () {},
    handleCurrentChange () {
      console.log(1)
    }
  }
}
</script>
<style lang="scss" scoped>
#detail {
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
