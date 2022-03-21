<template>
  <div id="admin">
    <div class="main">
      <div class="nav">
        <div class="title">疫情防控管理系统</div>
        <div class="nav-list">
          <div
            class="nav-item"
            v-for="(item, index) in nav"
            :key="index"
            @click="changeroute(item.path)"
            :class="key == item.path ? 'select' : ''"
          >
            <i class="iconfont" :class="item.icon"></i>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="header">
          <div class="greet">{{ greeting }}，欢迎来到疫情防控管理系统</div>
          <div class="user">
            <img :src="avatar ? avatar : require('@/assets/common/default-avatar.png')" alt="头像" />
            <span class="name">{{name}}</span>
            <div class="out" @click="loginOut">退出登陆</div>
          </div>
        </div>
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
// import { intercept } from '@/mixins/intercept.js'
export default {
  name: 'App',
  data () {
    return {
      nav: [
        {
          name: '主页',
          icon: 'icon-zhuye',
          path: '/dashboard'
        },
        {
          name: '账号管理',
          icon: 'icon-xitongguanli-zhanghaoguanli',
          path: '/users'
        },
        {
          name: '核酸检测详情',
          icon: 'icon-hesuanjiance',
          path: '/details'
        },
        {
          name: '外出管理',
          icon: 'icon-waichushenqing',
          path: '/outofmanager'
        },
        {
          name: '疫情公告',
          icon: 'icon-gonggao',
          path: '/notice'
        },
        {
          name: '编辑公告',
          icon: 'icon-bianji',
          path: '/editannount'
        },
        {
          name: '个人中心',
          icon: 'icon-zhanghao',
          path: '/personal'
        }
      ],
      avatar: '',
      name: ''
    }
  },
  created () {
    this.avatar = this.$store.getters.avatar
    this.name = this.$store.getters.username
  },
  computed: {
    greeting: () => {
      // 获取当前时间
      const timeNow = new Date()
      // 获取当前小时
      const hours = timeNow.getHours()
      // 设置默认文字
      let text = 'Hello'
      // 判断当前时间段
      if (hours >= 0 && hours <= 10) {
        text = '早上好'
      } else if (hours > 10 && hours <= 14) {
        text = '中午好'
      } else if (hours > 14 && hours <= 18) {
        text = '下午好'
      } else if (hours > 18 && hours <= 24) {
        text = '晚上好'
      }
      // 返回当前时间段对应的状态
      return text
    },
    key: function () {
      return this.$route.path
    }
  },
  methods: {
    // 点击导航栏后的回调
    changeroute (path) {
      if (path !== this.$route.path) {
        this.$router.push(path)
      }
    },
    loginOut () {
      this.$toast('成功退出登陆')
      localStorage.setItem('token', '')
      window.location.pathname = '/login.html'
    }
  }
  // mixins: [intercept]
}
</script>
<style lang="scss" scoped>
#admin {
  position: relative;
  width: 100%;
  min-width: 700px;
  height: 100%;
  overflow: hidden;
  background-color: #fafbfe;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: blur(150px);
    z-index: 1;
  }
  .main {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .nav {
    width: 250px;
    height: 100vh;
    margin-right: 30px;
    font-size: 14px;
    background: linear-gradient(135deg, #8f75da 0, #727cf5 60%);
    .title {
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
    }
    .nav-item {
      height: 40px;
      line-height: 40px;
      padding-left: 30px;
      font-size: 16px;
      color: #cedce4;
      cursor: pointer;
      transition: all 0.3s;
      i {
        margin-right: 10px;
        vertical-align: middle;
      }
      .name {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .nav-item.select {
      padding-left: 40px;
      color: #fff;
    }
  }
  .container {
    flex: 1;
    height: 100%;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0px 0px 10px 0px rgb(49 149 255 / 6%);
      padding: 15px 30px;
      background: #ffffff;
      .greet {
        font-size: 20px;
      }
      .user {
        position: relative;
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border: 1px solid #ccc;
          border-radius: 50%;
          vertical-align: middle;
        }
        .name {
          margin-right: 10px;
          vertical-align: middle;
        }
        .out {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          padding: 10px 20px;
          display: none;
          cursor: pointer;
          background-color: #fff;
          color: #666;
          &:hover {
            color: $primary;
          }
        }
        &:hover {
          color: $primary;
          .out {
            display: block;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
#admin {
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
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #eee;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 1px;
    background: linear-gradient(135deg, #8f75da 0, #727cf5 60%);
  }
}
</style>
