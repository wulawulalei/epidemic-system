<template>
  <div id="dashboard">
    <div class="header"></div>
    <div class="wave">
      <div class="banner_wave_1"></div>
      <div class="banner_wave_2"></div>
    </div>
    <div class="main">
      <div class="item" @click="toArticle(1)">
        <div class="time">
          <i></i>发布于2021-12-1
        </div>
        <div class="title">
          <i></i>
          <span>Web前端面试题：写一个mul函数</span>
        </div>
        <div class="meta">
          作者：
          <span class="author">的风格</span>
        </div>
        <div
          class="content"
        >摘要：问题：写一个mul函数调用时将生成以下输出: console.log(mul(2)(3)(4)); // output : 24 console.log(mul(4)(3)(4)); // output : 48 回答：时允 这个应该是题主想要的答案，支持任意次数调用。主要是考察了对递归的理解，和</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    toArticle(params) {
      this.$router.push({
        path: `/article/${params}`,
        params
      })
    }
  }
}
</script>
<style lang='scss' scoped>
#dashboard {
  .header {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('../../../../assets/user/dashboard.jpg') no-repeat;
    background-size: cover;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: url('../../../../assets/user/cover.png');
    }
  }
  .wave {
    position: absolute;
    height: 110px;
    width: 100%;
    overflow: hidden;
    bottom: 0;
    z-index: 99;
    .banner_wave_1 {
      position: absolute;
      width: 200%;
      height: 100%;
      left: 0;
      background: url('../../../../assets/user/wave1.png') bottom repeat-x;
      animation: water-left 30s infinite;
    }
    .banner_wave_2 {
      position: absolute;
      width: 200%;
      height: 100%;
      left: -100%;
      background: url('../../../../assets/user/wave2.png') bottom repeat-x;
      animation: water-right 20s infinite;
    }
    @keyframes water-left {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
    @keyframes water-right {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(50%);
      }
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 70px 10px 0 10px;
    z-index: 999999;
    .item {
      width: 60%;
      max-width: 600px;
      height: 300px;
      position: relative;
      margin: 20px 0 20px;
      padding: 20px 30px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0);
      box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
      transition: box-shadow 0.3s;
      .time {
        color: #888;
        font-size: 12px;
      }
      .title {
        width: 100%;
        margin: 15px 0;
        font-size: 22px;
        color: #000;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        span {
          cursor: pointer;
          transition: color 0.5s;
          &:hover {
            color: #ccc;
          }
        }
      }
      .content {
        margin: 15px 0;
        color: #4a4a4a;
      }
      &:hover {
        box-shadow: 0 5px 10px 5px rgba(110, 110, 110, 0.4);
      }
    }
  }
}
</style>