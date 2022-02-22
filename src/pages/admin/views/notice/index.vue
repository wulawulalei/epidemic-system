<template>
  <div id="notice" class="body-common">
    <div class="remind">
      <h4>小区公告</h4>
      <p>该页面为小区公告，管理员发布公告</p>
      <p>
        添加一个公告，
        <span class="add">点击这里进行添加</span>
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
    <div class="contain">
      <div class="item">
        <img src="../../../../assets/user/dashboard.png" alt />
        <p>hhhhhhhhhhhhhh</p>
        <div class="info">
          <img src="../../../../assets/user/dashboard.png" alt />
          <div class="avatar">dfd</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Pagination } from 'element-ui'
export default {
  name: 'notice',
  components: {
    [Pagination.name]: Pagination,
  },
  data() {
    return {
      pagiantion: {
        total: 0,
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    handleCurrentChange() {
      console.log(1)
    }
  }
}
</script>
<style lang='scss' scoped>
#notice {
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
  .contain {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .item {
      width: 236px;
      margin-bottom: 10px;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.02);
      transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      cursor: pointer;
      border-radius: $radius;
      > img {
        width: 100%;
        min-height: 100px;
        border-radius: $radius $radius 0 0;
      }
      p {
        padding: 0 16px;
        margin: 10px 0;
        word-wrap: break-word;
      }
      .info {
        display: flex;
        align-items: center;
        margin: 16px 0;
        padding: 0 16px;
        color: #999;
        img {
          width: 34px;
          height: 34px;
          margin-right: 20px;
          background-color: #fff;
          border-radius: 50%;
        }
      }
      &:hover {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02),
          0 16px 32px -4px rgba(0, 0, 0, 0.17);
        transform: translateY(-1px);
      }
    }
  }
}
</style>