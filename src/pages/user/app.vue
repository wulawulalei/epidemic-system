<template>
  <div id="user">
    <div class="scroll-top"></div>
    <ul class="nav">
      <li v-for="(item,index) in nav" :key="index" @click="to(item.to)">
        <div class="menu">{{item.title}}</div>
        <i></i>
      </li>
    </ul>
    <router-view></router-view>
    <div class="footer">Copyright © 2022 哈哈哈</div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      nav: [
        { title: '首页', to: '/dashboard' },
        { title: '外出申请', to: '/goout' },
        { title: '登记检测', to: '/register' },
        { title: '个人中心', to: '/personal' },
      ]
    }
  },
  methods: {
    to(path) {
      if (path != this.$route.path) {
        this.$router.push(
          path
        )
      }
    }
  }
}
</script>
<style lang='scss' scoped>
#user {
  .scroll-top {
    position: fixed;
    top: 0;
    height: 3px;
    background: orange;
    transiton-property: width, background;
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
      &:hover {
        color: #fe9600;
        i {
          width: 100%;
          left: 0;
        }
      }
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
    height: 100%;
    background: url('../../assets/user/dashboard.jpg') no-repeat;
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
</style>