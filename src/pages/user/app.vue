<template>
  <div class="container">
    <div id="user" v-if="!loading">
      <div class="scroll-top"></div>
      <ul class="nav">
        <li v-for="(item, index) in nav" :key="index" @click="to(item.to)">
          <div class="menu" :class="$route.path == item.to ? 'select' : ''">
            {{ item.title }}
          </div>
          <i></i>
        </li>
      </ul>
      <div class="loginout" @click="showExit = true">退出</div>
      <router-view></router-view>
      <div class="footer">Copyright © 2022 XZY</div>
      <Exit :show.sync="showExit" />
    </div>
    <div class="loading" v-if="loading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>
import { intercept } from '@/mixins/intercept.js'
const Exit = () => import('@/components/exit')
export default {
  name: 'App',
  components: { Exit },
  data () {
    return {
      nav: [
        { title: '首页', to: '/dashboard' },
        { title: '外出申请', to: '/goout' },
        { title: '登记检测', to: '/register' },
        { title: '个人中心', to: '/personal' }
      ],
      loading: false,
      showExit: false
    }
  },
  methods: {
    to (path) {
      if (path !== this.$route.path) {
        this.$router.push(path)
      }
    }
  },
  mixins: [intercept]
}
</script>
<style lang="scss" scoped>
#user {
  position: relative;
  .scroll-top {
    position: fixed;
    top: 0;
    height: 3px;
    background-color: orange;
    transiton-property: width, backgroundColor;
    transition-duration: 1s, 1s;
    z-index: 99999;
  }
  .nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 75px;
    margin: 0 auto;
    border-top: 0;
    background-color: #fff;
    border-bottom: 1px #ffebf2 solid;
    z-index: 999;
    li {
      position: relative;
      cursor: pointer;
      .menu {
        padding: 28px;
        font-size: 16px;
        text-align: center;
        transition: color 0.3s;
      }
      i {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 4px;
        background-color: #fe9600;
        transition: 1s;
      }
      &:hover,
      .select {
        color: #fe9600;
        i {
          width: 100%;
          left: 0;
        }
      }
    }
  }
  .loginout {
    position: fixed;
    top: 27px;
    right: 36px;
    cursor: pointer;
    z-index: 9999;
    &:hover {
      color: $primary;
    }
  }
  .footer {
    border-top: 1px solid #eef2f8;
    font-weight: 300;
    z-index: 9999;
    padding: 72px 0px;
    text-align: center;
  }
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url('../../assets/user/dashboard.png') no-repeat;
    background-size: cover;
    opacity: 0.05;
    z-index: -1;
  }
}
</style>
<style lang="scss">
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #eee;
}
::-webkit-scrollbar-thumb {
  border-radius: 1px;
  background: linear-gradient(90deg, #82e0f7 0%, #009ddc 52%);
}
#user {
  .el-pagination {
    .el-pager {
      .number {
        color: $colAuxiText;
        border-radius: $radius;
      }
    }
    .btn-prev,
    .btn-next,
    .btn-quicknext {
      border-radius: $radius !important;
      background-color: transparent;
    }
    .el-pagination__jump {
      margin-left: 0;
      font-size: 14px;
      color: $colAuxiText;
      input {
        color: $primary;
      }
    }
  }
  .el-table {
    th {
      border-top: 1px solid #e3eaef;
      border-bottom: 2px solid #e3eaef;
      .cell {
        font-size: 16px;
        font-weight: normal;
        color: #333333;
      }
    }
    .caret-wrapper {
      width: 10px;
    }
    .el-table__body .cell {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .el-table__row > td {
      padding: 0;
      height: 60px;
      line-height: 60px;
    }
  }
}
</style>
