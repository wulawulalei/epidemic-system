<template>
  <div id="article">
    <div class="banner">
      <div class="info">
        <div class="title">Web前端面试题：写一个mul函数</div>
        <div class="article-info">
          <img class="avatar" />
          <span class="author">Toretto</span>
          ·
          <span class="article-time">2021-12-01 14:22</span>
          ·
          <span class="read-num">33</span>
          次阅读
        </div>
      </div>
    </div>
    <div class="content">水水水水水水水水水水水水水水水水水水水</div>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang='scss' scoped>
#article {
  margin-top: 75px;
  .banner {
    position: relative;
    width: 100%;
    height: 500px;
    background: url('../../../../assets/user/dashboard.jpg') no-repeat;
    background-size: cover;
    .info {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      width: 80%;
      margin: 0 auto;
      color: #fff;
      text-shadow: 2px 2px 10px #000;
      .title {
        width: 100%;
        margin: 15px 0;
        font-size: 22px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 100%;
        margin-right: 12px;
        vertical-align: top;
      }
    }
  }
  .content {
    width: 60%;
    min-width: 600px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 66px 15px 10px;
  }
}
</style>