<template>
  <div id="admin">
    <div class="main">
      <div class="nav">
        <div class="title">疫情防控管理系统</div>
        <div class="nav-list">
          <div
            class="nav-item"
            v-for="(item,index) in nav"
            :key="index"
            @click="changeroute(item.path)"
            :class="key==item.path?'select':''"
          >
            <!--  -->
            <div class="icon"></div>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="header">
          <div class="greet">{{greeting}}，欢迎来到疫情防控管理系统</div>
          <div class="user">
            <img src alt="头像" />
            <span class="name">张三</span>
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
export default {
  name: 'App',
  data() {
    return {
      nav: [
        {
          name: '主页',
          icon: '',
          path: '/dashboard'
        }, {
          name: '核酸检测详情',
          icon: '',
          path: '/details'
        }, {
          name: '外出管理',
          icon: '',
          path: '/outofmanager'
        }, {
          name: '疫情公告',
          icon: '',
          path: '/notice'
        }, {
          name: '编辑公告',
          icon: '',
          path: '/editannount'
        }, {
          name: '个人中心',
          icon: '',
          path: '/personal'
        },
      ]
    }
  },
  computed: {
    greeting: () => {
      // 获取当前时间
      const timeNow = new Date()
      // 获取当前小时
      const hours = timeNow.getHours()
      // 设置默认文字
      let text = `Hello`
      // 判断当前时间段
      if (hours >= 0 && hours <= 10) {
        text = `早上好`
      } else if (hours > 10 && hours <= 14) {
        text = `中午好`
      } else if (hours > 14 && hours <= 18) {
        text = `下午好`
      } else if (hours > 18 && hours <= 24) {
        text = `晚上好`
      }
      // 返回当前时间段对应的状态
      return text
    },
    key: function () {
      return this.$route.path
    },
  },
  methods: {
    //点击导航栏后的回调
    changeroute(path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang='scss' scoped>
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
    height: 100%;
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
      background: transparent;
      .greet {
        font-size: 20px;
      }
      .user {
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .name {
          margin-right: 10px;
        }
        &:hover {
          color: $primary;
        }
      }
    }
  }
}
</style>
<style lang='scss'>
#admin {
  .el-pagination {
    .el-pager {
      .number {
        // background-color: $colAuxiText;
        border-radius: $radius;
      }
    }
    .btn-prev,
    .btn-next {
      border-radius: $radius;
      background-color: transparent;
    }
    .el-pagination__jump {
      font-size: 14px;
      color: $colAuxiText;
      input {
        color: $primary;
      }
    }
  }
}
</style>